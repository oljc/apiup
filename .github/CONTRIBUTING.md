# 🤝 贡献指南

简体中文 | [English](./CONTRIBUTING.en-US.md)

感谢您对 **ApiUp** 项目的贡献兴趣！我们欢迎各种形式的贡献。

**ApiUp** 是一个基于 `TypeScript` 和 `Hono` 构建的开放 API 服务平台。

## 🌟 如何贡献

在开始贡献之前，请先阅读以下内容：

1. 🔍 搜索现有的 [Issues](https://github.com/oljc/apiup/issues) 和 [Pull Requests](https://github.com/oljc/apiup/pulls)
2. 💬 对于较大的变更或新功能，请先创建 Issue 进行讨论
3. 📋 阅读我们的 [行为准则](https://github.com/oljc/apiup/blob/main/.github/CODE_OF_CONDUCT.md)
4. ⭐ 给项目点个 Star 表示支持（可选但很感谢！）


> 复刻 → 克隆 → 切分支 → 开发 → 提交 → PR → 审查 → 合并

----

### 🔗 Fork 并克隆仓库

1. Fork 仓库到自己的账号
2. 克隆到本地
```bash
git clone https://github.com/YOUR_USERNAME/apiup.git
```

3. 设置上游仓库
```bash
git remote add upstream https://github.com/oljc/apiup.git
```


### ⚙️ 环境准备

项目推荐使用 Bun 作为包管理器，如果没有安装，请先安装 [Bun](https://bun.com/)。

1. 安装依赖
```bash
bun install
```

2. 启动开发服务器
```bash
bun run dev
```

其他命令：

| 命令 | 用途 | 说明 |
|------|------|------|
| `bun run dev` | 开发模式 | 启动开发服务器，支持热重载 |
| `bun run start` | 生产模式 | 启动生产服务器 |
| `bun run build` | 构建项目 | 编译 TypeScript 到 dist 目录 |
| `bun run type:check` | 类型检查 | 检查 TypeScript 类型错误 |
| `bun run check` | 代码检查 | 运行 Biome 检查代码质量 |
| `bun run check:fix` | 自动修复 | 自动修复可修复的代码问题 |


### 🌲 创建分支

分支策略：

- `main`: 主分支，包含稳定的生产代码
- `feature/*`: 功能分支，用于开发新功能 (如: `feature/bilibili-api`)
- `fix/*`: 修复分支，用于修复问题 (如: `fix/xhs-parsing-error`)
- `docs/*`: 文档分支，用于文档更新 (如: `docs/api-examples`)

新功能：

```bash
git checkout -b feature/your-feature-name
```

修复：

```bash
git checkout -b fix/issue-description
```

文档更新：

```bash
git checkout -b docs/your-docs-name
```

### 💡 开发

- 编写代码，遵循现有风格
- 更新相关文档和注释
- 添加测试用例
- 检查代码

检查类型错误：
```bash
bun run type:check
```

检查代码格式：
```bash
bun run check
```

自动修复代码格式问题：
```bash
bun run check:fix
```


### 📄 提交变更

我们使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范，这有助于自动生成变更日志。

提交信息格式 `<type>[optional scope]: <description>`

提交类型:

- `feat`: ✨ 新功能
- `fix`: 🐛 Bug 修复
- `docs`: 📚 文档变更
- `style`: 🎨 代码格式化（不影响功能的变更）
- `refactor`: ♻️ 重构（既不是新功能也不是修复）
- `perf`: ⚡ 性能优化
- `test`: 🧪 测试相关
- `chore`: 🔧 构建过程或辅助工具的变动
- `ci`: 👷 CI 配置文件和脚本变更


提交示例：
```bash
git add .
git commit -m "feat: add xxx api"
```


### 🔄 同步推送

同步主分支：

```bash
git fetch upstream
git rebase upstream/main
```
    
推送分支：

```bash
git push origin feature/your-feature-name
```

## 📝 创建 PR

提交完成后，在 GitHub 上创建 Pull Request。

PR 标题遵循提交信息格式：

`类型(可选范围): 描述`

```bash
fix(middleware): fix CORS configuration issues
```


### 🔍 代码审查

1. **自动检查**：CI 会自动运行所有检查
2. **代码审查**：项目维护者会审查核实代码
3. **反馈处理**：根据审查反馈进行回复、修改直到通过审核
4. **合并**：通过审查后合并到主分支，删除分支



## 🐛 问题报告

使用 [Bug 报告模板](https://github.com/oljc/apiup/issues/new?template=bug-report.yml)，请简要说明问题、复现步骤和环境信息。

使用 [功能请求模板](https://github.com/oljc/apiup/issues/new?template=feature.yml)，简要描述功能、使用场景和预期效果。

## 🎯 贡献建议

如果你是第一次贡献，可以从这些类型的任务开始：

- 📝 改进文档和注释
- 🐛 修复标记为 `good first issue` 的问题
- ✨ 添加新的 API 接口（参考现有的 xhs 接口）
- 🧪 添加测试用例
- 🌐 改进错误信息和用户体验


对于有经验的高级贡献者，可以考虑：

- 🚀 性能优化和架构改进
- 🔒 安全性增强
- 📦 新的中间件开发
- 🌍 国际化支持
- 📊 监控和日志系统

## 💬 社区支持

- 💬 **讨论**：使用 [GitHub Discussions](https://github.com/oljc/apiup/discussions) 进行技术讨论
- 🐛 **问题报告**：使用 [GitHub Issues](https://github.com/oljc/apiup/issues) 报告问题
- 📧 **联系维护者**：通过 Issue 或 Discussion 联系项目维护者

## 🙏 致谢

感谢所有为 ApiUp 项目做出贡献的开发者！🎉 你们的每一个贡献都让这个项目变得更好。
