---
title: Skills、Agent(Subagent) 和 Command 的准确对比
date: 2025-11-19
author: IronRookieCoder
---

## Skills、Agent(Subagent) 和 Command 的准确对比

### 一、核心概念

#### 1. **Skills (技能)**

Agent Skills 将专业知识打包成可发现的能力。每个 Skill 由一个 SKILL.md 文件和可选的支持文件(如脚本和模板)组成。

**核心特点**：

- Skills 是模型调用的——Claude 根据您的请求和 Skill 的描述自主决定何时使用它们。这与用户调用的斜杠命令不同(您显式输入 /command 来触发)
- **渐进式披露**：在启动时，代理将每个已安装 Skill 的名称和描述预加载到系统提示中。这是渐进式披露的第一层：它提供足够的信息让 Claude 知道何时应该使用每个 Skill，而无需将所有内容加载到上下文中
- **可移植性**：跨项目、跨对话重用

**YAML frontmatter 要求：**

SKILL.md 前置元数据需要`name`包含`description`具有特定验证规则的字段：

- `name`最多 64 个字符，仅限小写字母/数字/连字符，不含 XML 标签，不含保留字
- `description`最多 1024 个字符，非空，不含 XML 标签

#### 2. **Subagents (子代理)**

Claude Code 中的自定义 subagents 是可以被调用来处理特定类型任务的专门 AI 助手。它们通过提供任务特定的配置(包括自定义系统提示、工具和独立的上下文窗口)来实现更高效的问题解决。

**核心特点**：

- 每个 subagent 都有自定义系统提示来指导其行为。当 Claude Code 遇到与 subagent 专业领域匹配的任务时，它可以将该任务委托给专门的 subagent，后者独立工作并返回结果。每个 subagent 在自己的上下文中操作，防止主对话的污染并保持其专注于高级目标
- **可以自动或手动调用**：SDK 将根据任务上下文自动调用适当的 subagents

#### 3. **Commands (斜杠命令)**

自定义斜杠命令允许您将经常使用的提示定义为 Markdown 文件，Claude Code 可以执行这些文件。命令按范围(项目特定或个人)组织，并通过目录结构支持命名空间。

**核心特点**：

- **用户显式触发**：通过输入 `/command-name` 调用
- **简单提示注入**：斜杠命令只是提示注入。当您输入 /run-tests 时，Claude Code 会将该提示注入到您的主线程中。所有内容都发生在同一个上下文窗口中

### 二、关键区别对比表

| 维度           | Skills             | Subagents                  | Commands                |
| -------------- | ------------------ | -------------------------- | ----------------------- |
| **调用方式**   | 模型自动发现和调用 | 自动或显式调用             | 用户显式输入 `/command` |
| **实现机制**   | 元工具(meta-tool)  | 独立 AI 实例               | 提示注入                |
| **上下文**     | 按需加载到主上下文 | 独立上下文窗口             | 共享主对话上下文        |
| **复杂度**     | 适合可重用专业知识 | 适合需要深度分析的复杂任务 | 适合简单重复操作        |
| **token 效率** | 渐进式加载，高效   | 独立上下文，可能消耗更多   | 全部注入主线程          |

### 三、架构关系

**目录结构**：

```
~/.claude/                     # 用户级配置
├── skills/                    # Skills 目录
│   ├── pdf-processing/
│   │   ├── SKILL.md          # 必需：技能定义
│   │   ├── scripts/          # 可选：可执行脚本
│   │   └── reference/        # 可选：参考文档
│   └── data-analysis/
│       └── SKILL.md
├── agents/                    # Subagents 目录
│   ├── code-reviewer.md      # 代码审查代理
│   ├── test-generator.md     # 测试生成代理
│   └── security-auditor.md   # 安全审计代理
└── commands/                  # Commands 目录
    ├── optimize.md           # /optimize 命令
    └── review.md             # /review 命令

.claude/                       # 项目级配置
├── skills/                    # 项目 Skills
├── agents/                    # 项目 Subagents
└── commands/                  # 项目 Commands
```

**重要说明**：

- Slash commands 和 Agent Skills 在 Claude Code 中服务于不同的目的
- Skills **不包含** commands
- 三者是平行的、独立的系统

### 四、协作方式

#### 1. **Skills 与 Subagents 的协作**

Agent Skills 为 subagents 提供对特定知识库(如文档、源代码或 API 参考)的访问。这为他们提供了对技术堆栈的深入、上下文理解。

**工作流程**：

```
用户请求
  ↓
主 Claude 调用 code-reviewer subagent
  ↓
subagent 自动使用 security-guidelines Skill
  ↓
subagent 返回审查结果给主 Claude
  ↓
主 Claude 综合并展示给用户
```

#### 2. **Commands 与 Subagents 的协作**

斜杠命令可以编排 subagents。您可能有 /commands 触发不同类型的 subagents 来协调复杂任务。斜杠命令用于编排器，subagents 是您委托的方式。

**实际示例**：

```bash
# 用户输入命令
/analyze-performance

# 命令内部逻辑触发多个 subagents
# - log-parser subagent 分析应用日志
# - db-analyzer subagent 分析数据库查询
# - code-reviewer subagent 审查最近的代码更改

# 各 subagent 在独立上下文中工作
# 返回结果汇总给用户
```

### 五、选择决策

#### **何时使用 Skills？**

综合能力与结构：具有多个步骤的复杂工作流程、需要脚本或实用程序的能力、跨多个文件组织的知识、您想要标准化的团队工作流程。

**适用场景**：

- ✅ PDF 处理（带表单填充脚本和验证）
- ✅ 数据分析（带不同数据类型的参考文档）
- ✅ 文档编写（带风格指南和模板）

#### **何时使用 Subagents？**

Subagents 是为任务特定工作流程和改进上下文管理而创建和使用的专门 AI subagents。

**适用场景**：

- ✅ 代码审查（需要独立分析和判断）
- ✅ 安全审计（需要专门的安全专业知识）
- ✅ 测试生成（需要理解代码上下文）
- ✅ 复杂的多步骤任务（避免主线程上下文污染）

#### **何时使用 Commands？**

快速、常用的提示：您经常使用的简单提示片段、快速提醒或模板、适合一个文件的常用指令。

**适用场景**：

- ✅ `/review` → "审查此代码的错误并提出改进建议"
- ✅ `/explain` → "用简单的术语解释此代码"
- ✅ `/optimize` → "分析此代码的性能问题"

### 六、关键原则

1. **Skills 用于可移植知识**：Skills 在 Claude 的代理产品中可用：在 Claude Code 中创建它们，通过 API 上传它们，或在 claude.ai 设置中添加它们
2. **Subagents 用于上下文隔离**：每个 subagent 在自己的上下文中操作，防止主对话的污染并保持其专注于高级目标
3. **Commands 用于快速执行**：自定义斜杠命令允许您将经常使用的提示定义为 Markdown 文件
4. **三者相互独立但可协作**：它们是平行系统，可以组合使用以构建强大的工作流程