# Common 目录说明

本目录包含了从《Claude Code 结构化任务分解实践指南》中抽离出来的可复用模板和配置文件。

## 目录结构

```
common/
├── agents/              # Subagent 配置文件
│   ├── implementer.md   # 代码实现者
│   └── reviewer.md      # 代码审查者
├── commands/            # 自定义 Slash Commands
│   ├── create-plan.md   # 创建详细计划
│   ├── process-task.md  # 执行指定阶段任务
│   ├── smart-commit.md  # 智能 Git 提交
│   └── create-pr.md     # 创建 Pull Request
├── templates/           # 文档模板
│   ├── plan.md          # 项目计划模板
│   └── progress.md      # 进度跟踪模板
└── README.md            # 本说明文件
```

## 如何使用

### 1. Agents（代理配置）

将需要的 agent 文件复制到你的项目的 `.claude/agents/` 目录：

```bash
# 复制所有 agents
cp common/agents/*.md your-project/.claude/agents/

# 或选择性复制
cp common/agents/implementer.md your-project/.claude/agents/
cp common/agents/reviewer.md your-project/.claude/agents/
```

**可用的 Agents:**
- **implementer.md** - 严格按照计划执行代码实现，专注于执行而非决策
- **reviewer.md** - 代码审查专家，检查质量、安全性和可维护性

### 2. Commands（自定义命令）

将需要的命令文件复制到你的项目的 `.claude/commands/` 目录：

```bash
# 复制所有命令
cp common/commands/*.md your-project/.claude/commands/

# 或选择性复制
cp common/commands/create-plan.md your-project/.claude/commands/
cp common/commands/process-task.md your-project/.claude/commands/
```

**可用的 Commands:**
- **create-plan.md** - 基于用户需求创建详细的 plan.md 文件
- **process-task.md** - 执行 plan.md 中指定 Phase 的所有任务
- **smart-commit.md** - 分析更改并生成规范的 Git commit
- **create-pr.md** - 创建详细的 GitHub Pull Request

使用方式：
```bash
/create-plan [功能描述]
/process-task [phase-number]
/smart-commit
/create-pr
```

### 3. Templates（模板文件）

使用模板文件创建你的项目计划和进度跟踪文件：

```bash
# 创建项目计划
cp common/templates/plan.md your-project/plan.md

# 创建进度跟踪
cp common/templates/progress.md your-project/progress.md
```

**模板说明:**
- **plan.md** - 项目计划模板，包含阶段分解、检查清单、技术决策、风险评估等
- **progress.md** - 进度跟踪模板，包含当前状态、已完成任务、问题记录、学习经验等

## 快速开始

在新项目中完整设置 Claude Code 工作流：

```bash
# 1. 创建 .claude 目录结构
mkdir -p your-project/.claude/{agents,commands}

# 2. 复制所有配置文件
cp common/agents/*.md your-project/.claude/agents/
cp common/commands/*.md your-project/.claude/commands/

# 3. 创建项目管理文件
cp common/templates/plan.md your-project/plan.md
cp common/templates/progress.md your-project/progress.md

# 4. 提交当前代码 (可选)
```

---

## 权限配置

使用 `/permissions` 命令配置工具访问权限：

### 允许所有Git操作（推荐用于smart-commit）
```bash
# 添加到允许规则
Bash(git add:*), Bash(git status:*), Bash(git commit:*), Bash(git push:*)
```

### MCP工具权限
如果使用MCP服务器，不要使用通配符：
- ✅ 正确：`mcp__github`（允许github服务器的所有工具）
- ✅ 正确：`mcp__github__get_issue`（允许特定工具）
- ❌ 错误：`mcp__github__*`（不支持通配符）

### SlashCommand权限
允许Claude自动调用斜杠命令：
```bash
# 允许所有自定义命令
SlashCommand

# 允许特定命令
SlashCommand:/create-plan:*
SlashCommand:/process-task:*
```

---

## 验证配置

### 1. 检查agents是否加载
```bash
/agents
```
应该能看到 `implementer` 和 `reviewer` 两个agent。

### 2. 检查commands是否可用
```bash
/help
```
应该能看到以下命令（标记为"项目"）：
- `/create-plan` - 基于用户需求创建详细的 plan.md 文件
- `/process-task` - 执行 plan.md 中指定 Phase 的所有任务
- `/smart-commit` - 分析更改并生成规范的 Git commit
- `/create-pr` - 创建详细的 GitHub Pull Request

### 3. 测试命令功能
```bash
# 测试创建计划
/create-plan 测试功能：实现用户登录

# 查看生成的 plan.md
# 应该包含阶段分解、检查清单等内容
```

### 4. 验证权限配置
```bash
/permissions
```
确认Git相关的Bash命令在允许列表中。

---

## 最佳实践

### Agents使用建议
- **从Claude生成开始**：使用 `/agents` 命令并选择"让Claude生成"作为起点
- **迭代改进**：基于实际使用效果逐步优化agent的系统提示
- **限制工具权限**：只给必需的工具访问权限，遵循最小权限原则
- **明确触发条件**：在description中使用"主动使用"/"必须使用"等词汇

### Commands使用建议
- **保持简洁**：每个命令专注一个明确的任务
- **使用参数**：通过 `$ARGUMENTS` 或 `$1, $2, ...` 传递动态值
- **文档化**：在description和argument-hint中清楚说明命令用途和参数
- **测试验证**：创建命令后立即测试，确保按预期工作

### 推荐工作流
1. **规划阶段**：`/create-plan [功能需求]` → 生成详细计划
2. **开发阶段**：`/process-task 1` → 执行Phase 1的所有任务
3. **审查阶段**：完成代码后，reviewer agent自动触发审查
4. **提交阶段**：`/smart-commit` → 生成符合规范的提交信息
5. **发布阶段**：`/create-pr` → 生成详细的PR描述

### 版本控制建议
- ✅ 将项目级agents和commands检入版本控制
- ✅ 在团队中共享统一的工作流配置
- ✅ 使用 `.gitignore` 排除敏感的用户级配置
- ✅ 定期同步团队的最佳实践到配置文件

---

## 故障排查

### 问题：agents不显示
**症状**：运行 `/agents` 看不到 implementer 或 reviewer

**解决方法**：
1. 确认文件在正确位置：`.claude/agents/implementer.md` 和 `.claude/agents/reviewer.md`
2. 检查YAML前置内容格式：
   ```yaml
   ---
   name: agent-name
   description: agent description
   tools: Read, Write
   model: sonnet
   ---
   ```
3. 确保没有多余的markdown代码块包裹（不要用 ``` 包裹整个文件）
4. 检查文件编码是否为UTF-8

### 问题：commands不可用
**症状**：运行 `/help` 看不到自定义命令

**解决方法**：
1. 确认文件在正确位置：`.claude/commands/*.md`
2. 检查文件名：文件名（不含.md）将成为命令名
3. 确认有description字段：
   ```yaml
   ---
   description: 命令描述
   ---
   ```
4. 重启Claude Code或运行 `/help` 刷新命令列表

### 问题：权限被拒绝
**症状**：执行命令时提示"Permission denied"或工具调用失败

**解决方法**：
1. 运行 `/permissions` 检查当前权限配置
2. 添加必要的工具到允许列表：
   - Bash工具：`Bash(git add:*), Bash(git status:*)`
   - 文件操作：`Read, Write, Edit`
3. 对于allowed-tools字段，确保格式正确：
   ```yaml
   allowed-tools: Bash(git add:*), Bash(git status:*)
   ```
4. 检查是否有拒绝规则覆盖了允许规则

### 问题：SlashCommand工具未调用命令
**症状**：Claude不会自动调用自定义命令

**解决方法**：
1. 确认命令有 `description` 字段（必需）
2. 在提示中明确引用命令名，例如：
   ```
   当准备提交代码时，运行 /smart-commit 命令
   ```
3. 检查是否超出字符预算（默认15000字符）：
   - 运行 `/context` 查看令牌使用情况
   - 如需要，设置环境变量 `SLASH_COMMAND_TOOL_CHAR_BUDGET`
4. 确认SlashCommand工具未被禁用：
   - 在 `/permissions` 中检查是否在拒绝列表

### 问题：$ARGUMENTS 或 $1, $2 不工作
**症状**：命令中的参数占位符没有被替换

**解决方法**：
1. 确认使用了正确的语法：
   - 所有参数：`$ARGUMENTS`
   - 单个参数：`$1`, `$2`, `$3` 等
2. 检查argument-hint是否正确设置：
   ```yaml
   argument-hint: [参数1] [参数2]
   ```
3. 调用命令时提供参数：
   ```
   /command arg1 arg2
   ```

### 问题：Bash命令执行失败
**症状**：使用 `!` 前缀的bash命令不执行

**解决方法**：
1. 确认allowed-tools中包含Bash权限：
   ```yaml
   allowed-tools: Bash(git status:*), Bash(git diff:*)
   ```
2. 检查命令语法：
   ```markdown
   当前状态：!`git status`
   ```
3. 确保命令在系统PATH中可用
4. 检查命令的具体权限规则是否匹配

### 问题：MCP工具无法访问
**症状**：MCP服务器的工具或提示无法使用

**解决方法**：
1. 运行 `/mcp` 检查服务器连接状态
2. 确认服务器已启动并处于活动状态
3. 检查权限配置：
   ```bash
   # 允许整个服务器的工具
   mcp__servername
   
   # 或允许特定工具
   mcp__servername__toolname
   ```
4. 如需OAuth认证，在 `/mcp` 界面完成认证流程

---

## 高级技巧

### 1. 链接多个命令
在CLAUDE.md或提示中定义工作流：
```markdown
完成开发后的标准流程：
1. 运行 /smart-commit 提交代码
2. 使用 reviewer agent 审查代码
3. 运行 /create-pr 创建拉取请求
```

### 2. 自定义agent模型
根据任务复杂度选择不同模型：
```yaml
---
name: quick-reviewer
model: haiku  # 快速轻量级审查
---
```

```yaml
---
name: deep-analyzer
model: opus  # 深度代码分析
---
```

### 3. 命令命名空间
使用子目录组织命令：
```
.claude/commands/
├── git/
│   ├── commit.md      # /commit (git)
│   └── pr.md          # /pr (git)
└── test/
    ├── unit.md        # /unit (test)
    └── integration.md # /integration (test)
```

### 4. 条件工具访问
为不同环境配置不同权限：
```yaml
# 开发环境 - 允许更多工具
allowed-tools: Read, Write, Edit, Bash

# 审查环境 - 只读权限
allowed-tools: Read, Grep, Glob
```

---

## 参考资源

- [Claude Code 官方文档 - 子代理](https://docs.claude.com/zh-CN/docs/claude-code/sub-agents)
- [Claude Code 官方文档 - 斜杠命令](https://docs.claude.com/zh-CN/docs/claude-code/slash-commands)
- [Claude Code 官方文档 - 权限管理](https://docs.claude.com/zh-CN/docs/claude-code/iam)
- [Conventional Commits 规范](https://www.conventionalcommits.org/)

---

## 贡献指南

欢迎提交改进建议！

1. Fork本项目
2. 创建特性分支：`git checkout -b feature/improvement`
3. 测试你的更改
4. 提交更改：`git commit -m 'feat: add new agent'`
5. 推送到分支：`git push origin feature/improvement`
6. 创建Pull Request

---

## 许可证

本项目配置文件和模板可自由使用和修改。

---

**最后更新**：2025-10-16
**维护者**：IronRookieCoder
# 编辑 your-project/plan.md
# 编辑 your-project/progress.md
```

## 自定义建议

这些文件都可以根据你的项目需求进行自定义：

1. **修改 Agent 行为** - 编辑 `agents/*.md` 文件调整 AI 助手的行为规则
2. **调整命令流程** - 编辑 `commands/*.md` 文件修改命令执行步骤
3. **定制模板结构** - 编辑 `templates/*.md` 文件调整文档结构

## 相关文档

- [Claude Code 结构化任务分解实践指南](../Claude%20Code%20结构化任务分解实践指南.md)
- [完整的长周期任务工作流](../完整的长周期任务工作流.md)
- [Claude Code 测试驱动开发（TDD）工作流指南](../Claude%20Code%20测试驱动开发（TDD）工作流指南.md)

## 贡献

如果你创建了有用的 agents、commands 或 templates，欢迎提交到本目录共享！
