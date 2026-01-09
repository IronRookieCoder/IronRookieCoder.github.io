---
description: 分析更改并生成规范的 Git commit
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git commit:*)
---

执行智能 Git 提交工作流：

1. **分析更改**
   
   运行以下命令分析代码变更：
   - `git status` - 查看文件状态
   - `git diff --stat` - 查看统计信息
   - `git diff` - 查看详细变更

2. **生成 Commit Message**
   
   根据更改内容生成符合 Conventional Commits 规范的消息：
   
   格式：`<type>(<scope>): <subject>`
   
   - **type**: feat, fix, refactor, test, docs, chore, style, perf
   - **scope**: 受影响的模块或组件
   - **subject**: 简短描述（50 字符以内）
   
   如果更改较大，添加 body：
   - 详细说明做了什么
   - 为什么这样做
   - 有什么影响

3. **执行提交**
   
   运行提交命令：
   - `git add .`
   - `git commit -m "<生成的消息>"`

4. **显示结果**
   
   - 显示提交的 SHA
   - 显示提交消息
   - 显示文件统计

示例输出：
```
✅ 提交成功
SHA: abc1234
Message: feat(auth): implement OAuth2 authentication

- Add Google and GitHub OAuth providers
- Implement token refresh mechanism
- Add integration tests

Files changed: 12
Insertions: 342
Deletions: 56
```
