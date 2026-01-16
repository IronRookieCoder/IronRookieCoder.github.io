## 模块一：Agent 基础架构（入门篇）

| #    | 参考文章                                                     | 内容                                 | 核心价值                                         |
| ---- | ------------------------------------------------------------ | ------------------------------------ | ------------------------------------------------ |
| 1    | Building effective agents ([https://www.anthropic.com/engineering/building-effective-agents](https://link.zhihu.com/?target=https%3A//www.anthropic.com/engineering/building-effective-agents)) | Agent 架构入门：从单轮对话到自主代理 | 理解 Agent 的基本模式：ReAct、Tool Use、Planning |
| 2    | Building agents with the Claude Agent SDK ([https://www.anthropic.com/engineering/building-agents-with-the-claude-agent-sdk](https://link.zhihu.com/?target=https%3A//www.anthropic.com/engineering/building-agents-with-the-claude-agent-sdk)) | 用 Agent SDK 构建你的第一个 Agent    | 实战入门，快速上手                               |

------

## 模块二：工具与能力扩展（进阶篇）

| #    | 参考文章                                                     | 内容                                     | 核心价值               |
| ---- | ------------------------------------------------------------ | ---------------------------------------- | ---------------------- |
| 3    | Introducing advanced tool use ([https://www.anthropic.com/engineering/advanced-tool-use](https://link.zhihu.com/?target=https%3A//www.anthropic.com/engineering/advanced-tool-use)) | Agent 高级工具调用：并行、嵌套与错误处理 | 工具调用的进阶技巧     |
| 4    | Writing effective tools for agents — with agents ([https://www.anthropic.com/engineering/writing-tools-for-agents](https://link.zhihu.com/?target=https%3A//www.anthropic.com/engineering/writing-tools-for-agents)) | 如何为 Agent 设计好用的工具              | 工具设计原则和最佳实践 |
| 5    | The "think" tool ([https://www.anthropic.com/engineering/claude-think-tool](https://link.zhihu.com/?target=https%3A//www.anthropic.com/engineering/claude-think-tool)) | Think Tool：让 Agent 学会"停下来想一想"  | 复杂推理场景的关键技巧 |
| 6    | Equipping agents for the real world with Agent Skills ([https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills](https://link.zhihu.com/?target=https%3A//www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)) | Agent Skills：让 Agent 具备真实世界能力  | 技能封装与复用         |

------

## 模块三：上下文与记忆管理（核心篇）

| #    | 参考文章                                                     | 内容                                     | 核心价值               |
| ---- | ------------------------------------------------------------ | ---------------------------------------- | ---------------------- |
| 7    | Effective context engineering for AI agents ([https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents](https://link.zhihu.com/?target=https%3A//www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)) | 上下文工程：Agent 的"记忆"与"注意力"管理 | 长对话、多轮任务的关键 |
| 8    | Introducing Contextual Retrieval ([https://www.anthropic.com/engineering/contextual-retrieval](https://link.zhihu.com/?target=https%3A//www.anthropic.com/engineering/contextual-retrieval)) | Contextual Retrieval：让 RAG 更懂上下文  | 检索增强的新范式       |

------

## 模块四：长任务与多 Agent（高级篇）

| #    | 参考文章                                                     | 内容                                       | 核心价值                 |
| ---- | ------------------------------------------------------------ | ------------------------------------------ | ------------------------ |
| 9    | Effective harnesses for long-running agents ([https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents](https://link.zhihu.com/?target=https%3A//www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)) | 长时间运行的 Agent：如何设计可靠的执行框架 | 任务中断恢复、状态持久化 |
| 10   | How we built our multi-agent research system ([https://www.anthropic.com/engineering/multi-agent-research-system](https://link.zhihu.com/?target=https%3A//www.anthropic.com/engineering/multi-agent-research-system)) | 多 Agent 协作系统：Anthropic 的实战经验    | 多 Agent 架构设计        |
| 11   | Code execution with MCP ([https://www.anthropic.com/engineering/code-execution-with-mcp](https://link.zhihu.com/?target=https%3A//www.anthropic.com/engineering/code-execution-with-mcp)) | MCP 代码执行：构建更高效的 Agent           | Agent 执行环境设计       |

------

## 模块五：安全、评测与工程化（生产篇）

| #    | 参考文章                                                     | 内容                             | 核心价值                |
| ---- | ------------------------------------------------------------ | -------------------------------- | ----------------------- |
| 12   | Demystifying evals for AI agents ([https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents](https://link.zhihu.com/?target=https%3A//www.anthropic.com/engineering/demystifying-evals-for-ai-agents)) | Agent 评测怎么做                 | 评测体系设计            |
| 13   | Beyond permission prompts: Claude Code sandboxing ([https://www.anthropic.com/engineering/claude-code-sandboxing](https://link.zhihu.com/?target=https%3A//www.anthropic.com/engineering/claude-code-sandboxing)) | Agent 安全：从权限提示到沙箱隔离 | 安全与自主性的平衡      |
| 14   | Claude Code: Best practices for agentic coding ([https://www.anthropic.com/engineering/claude-code-best-practices](https://link.zhihu.com/?target=https%3A//www.anthropic.com/engineering/claude-code-best-practices)) | Coding Agent 最佳实践            | Coding Agent 的工程经验 |
| 15   | A postmortem of three recent issues ([https://www.anthropic.com/engineering/a-postmortem-of-three-recent-issues](https://link.zhihu.com/?target=https%3A//www.anthropic.com/engineering/a-postmortem-of-three-recent-issues)) | Agent 故障复盘：三个真实案例分析 | 从失败中学习            |