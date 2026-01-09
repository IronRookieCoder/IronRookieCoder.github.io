---
description: 创建详细的 GitHub Pull Request
---

创建完整的 GitHub Pull Request：

1. **收集信息**
   - 读取 plan.md 获取功能概述
   - 运行 `git log --oneline origin/main..HEAD` 获取提交历史
   - 运行 `git diff origin/main --stat` 获取变更统计

2. **生成 PR 描述**
   
   生成包含以下内容的 PR 描述：
   
   - 🎯 概述：从 plan.md 提取的简要功能说明
   - 📝 变更内容：从 git log 提取的主要变更点
   - 🧪 测试：测试通过情况和测试命令
   - ✅ 检查清单：从 plan.md 提取已完成的任务
   - 📸 截图：如果是 UI 变更，添加截图说明
   - 🔗 相关链接：相关 Issue、设计文档、API 文档
   - ⚠️ 注意事项：从 plan.md 提取的潜在风险和注意事项

3. **创建 PR**
   
   如果安装了 GitHub CLI (gh)：
   ```bash
   gh pr create \
     --title "feat: [功能标题]" \
     --body "[生成的描述]" \
     --base main \
     --head [当前分支]
   ```

4. **输出结果**
   - 显示 PR 链接
   - 显示 PR 编号
   - 提示后续操作（请求审查、添加标签等）
