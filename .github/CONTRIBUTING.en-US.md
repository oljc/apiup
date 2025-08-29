# 🤝 Contributing Guide

[简体中文](./CONTRIBUTING.md) | English

Thank you for your interest in contributing to the **ApiUp** project! We welcome all forms of contributions.

**ApiUp** is an open API service platform built with `TypeScript` and `Hono`.

## 🌟 How to Contribute

Before you start contributing, please read the following:

1. 🔍 Search existing [Issues](https://github.com/oljc/apiup/issues) and [Pull Requests](https://github.com/oljc/apiup/pulls)
2. 💬 For major changes or new features, please create an Issue for discussion first
3. 📋 Read our [Code of Conduct](CODE_OF_CONDUCT.md)
4. ⭐ Give the project a Star to show your support (optional but much appreciated!)

> Fork → Clone → Branch → Develop → Commit → PR → Review → Merge

----

### 🔗 Fork and Clone Repository

1. Fork the repository to your own account
2. Clone to local
```bash
git clone https://github.com/YOUR_USERNAME/apiup.git
```

3. Set up upstream repository
```bash
git remote add upstream https://github.com/oljc/apiup.git
```

### ⚙️ Environment Setup

The project recommends using Bun as the package manager. If not installed, please install [Bun](https://bun.com/) first.

1. Install dependencies
```bash
bun install
```

2. Start development server
```bash
bun run dev
```

Other commands:

| Command | Purpose | Description |
|---------|---------|-------------|
| `bun run dev` | Development mode | Start development server with hot reload |
| `bun run start` | Production mode | Start production server |
| `bun run build` | Build project | Compile TypeScript to dist directory |
| `bun run type:check` | Type checking | Check TypeScript type errors |
| `bun run check` | Code checking | Run Biome to check code quality |
| `bun run check:fix` | Auto fix | Automatically fix fixable code issues |

### 🌲 Create Branch

Branch strategy:

- `main`: Main branch containing stable production code
- `feature/*`: Feature branches for developing new features (e.g., `feature/bilibili-api`)
- `fix/*`: Fix branches for bug fixes (e.g., `fix/xhs-parsing-error`)
- `docs/*`: Documentation branches for documentation updates (e.g., `docs/api-examples`)

For new features:

```bash
git checkout -b feature/your-feature-name
```

For fixes:

```bash
git checkout -b fix/issue-description
```

For documentation updates:

```bash
git checkout -b docs/your-docs-name
```

### 💡 Development

- Write code following existing style
- Update related documentation and comments
- Add test cases
- Check code

Check type errors:
```bash
bun run type:check
```

Check code format:
```bash
bun run check
```

Auto fix code format issues:
```bash
bun run check:fix
```

### 📄 Commit Changes

We use [Conventional Commits](https://www.conventionalcommits.org/) specification, which helps automatically generate changelogs.

Commit message format: `<type>[optional scope]: <description>`

Commit types:

- `feat`: ✨ New feature
- `fix`: 🐛 Bug fix
- `docs`: 📚 Documentation changes
- `style`: 🎨 Code formatting (changes that do not affect functionality)
- `refactor`: ♻️ Refactoring (neither new feature nor bug fix)
- `perf`: ⚡ Performance optimization
- `test`: 🧪 Test related
- `chore`: 🔧 Build process or auxiliary tool changes
- `ci`: 👷 CI configuration files and script changes

Commit examples:
```bash
git add .
git commit -m "feat: add xxx api"
```

### 🔄 Sync and Push

Sync main branch:

```bash
git fetch upstream
git rebase upstream/main
```
    
Push branch:

```bash
git push origin feature/your-feature-name
```

## 📝 Create PR

After committing, create a Pull Request on GitHub.

PR title follows commit message format:

`type(optional scope): description`

```bash
fix(middleware): fix CORS configuration issues
```

### 🔍 Code Review

1. **Automated checks**: CI will automatically run all checks
2. **Code review**: Project maintainers will review and verify the code
3. **Feedback handling**: Respond to and modify based on review feedback until approved
4. **Merge**: After passing review, merge to main branch and delete the branch

## 🐛 Issue Reporting

### Bug Reports

Use the [Bug Report Template](https://github.com/oljc/apiup/issues/new?template=bug-report.yml) to report issues, please include:

- 🔍 **Problem Description**: Clear description of the issue encountered
- 📋 **Reproduction Steps**: Detailed steps to reproduce
- 💻 **Environment Information**: Operating system, Node.js/Bun version, etc.
- 📸 **Screenshots or Logs**: Relevant error messages or screenshots

### Feature Requests

Use the [Feature Request Template](https://github.com/oljc/apiup/issues/new?template=feature.yml) to suggest new features, please include:

- 💡 **Feature Description**: Detailed description of the desired feature
- 🎯 **Use Cases**: Explain practical application scenarios for the feature
- 📈 **Expected Benefits**: Explain the value of the feature to users
- 💭 **Implementation Ideas**: If available, share your implementation thoughts

## 🎯 Contribution Suggestions

If you're contributing for the first time, you can start with these types of tasks:

- 📝 Improve documentation and comments
- 🐛 Fix issues marked as `good first issue`
- ✨ Add new API interfaces (refer to existing xhs interface)
- 🧪 Add test cases
- 🌐 Improve error messages and user experience

For experienced advanced contributors, consider:

- 🚀 Performance optimization and architecture improvements
- 🔒 Security enhancements
- 📦 New middleware development
- 🌍 Internationalization support
- 📊 Monitoring and logging systems

## 💬 Community Support

- 💬 **Discussions**: Use [GitHub Discussions](https://github.com/oljc/apiup/discussions) for technical discussions
- 🐛 **Issue Reports**: Use [GitHub Issues](https://github.com/oljc/apiup/issues) to report problems
- 📧 **Contact Maintainers**: Contact project maintainers through Issues or Discussions

## 🙏 Acknowledgments

Thanks to all developers who have contributed to the ApiUp project! 🎉 Every contribution makes this project better.