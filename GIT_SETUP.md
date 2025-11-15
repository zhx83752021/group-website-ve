# Git 设置和上传指南

## 📋 准备工作

### 1. 检查 Git 安装

```bash
git --version
```

如果未安装，请访问 [Git 官网](https://git-scm.com/) 下载安装。

### 2. 配置 Git

```bash
# 设置用户名
git config --global user.name "Your Name"

# 设置邮箱
git config --global user.email "your.email@example.com"

# 查看配置
git config --list
```

## 🚀 初始化 Git 仓库

### 1. 初始化本地仓库

```bash
# 在项目根目录执行
cd e:\site1\group-website

# 初始化 Git
git init

# 查看状态
git status
```

### 2. 添加文件到暂存区

```bash
# 添加所有文件
git add .

# 或者选择性添加
git add src/
git add backend/
git add package.json
git add README.md
```

### 3. 提交到本地仓库

```bash
# 首次提交
git commit -m "Initial commit: 集团官网项目"

# 查看提交历史
git log --oneline
```

## 🌐 创建 GitHub 仓库

### 1. 在 GitHub 上创建仓库

1. 访问 [GitHub](https://github.com)
2. 点击右上角的 "+" -> "New repository"
3. 填写仓库信息：
   - **Repository name**: `group-website`
   - **Description**: `企业官网 - Vue3 + TypeScript + Express + PostgreSQL`
   - **Visibility**: Public 或 Private
   - **不要**勾选 "Initialize this repository with a README"
4. 点击 "Create repository"

### 2. 连接远程仓库

```bash
# 添加远程仓库（替换为你的 GitHub 用户名）
git remote add origin https://github.com/yourusername/group-website.git

# 查看远程仓库
git remote -v

# 推送到远程仓库
git push -u origin main
```

如果遇到分支名称问题：
```bash
# 重命名分支为 main
git branch -M main

# 再次推送
git push -u origin main
```

## 📦 推荐的 .gitignore 配置

项目已包含 `.gitignore` 文件，确保以下内容被忽略：

```gitignore
# 依赖
node_modules/
backend/node_modules/

# 构建输出
dist/
backend/dist/

# 环境变量
.env
.env.local
backend/.env
backend/.env.local

# 日志
*.log

# 编辑器
.vscode/
.idea/
```

## 🔄 日常 Git 工作流

### 1. 查看状态

```bash
git status
```

### 2. 添加更改

```bash
# 添加所有更改
git add .

# 添加特定文件
git add src/pages/Home.vue
```

### 3. 提交更改

```bash
# 提交并添加消息
git commit -m "feat: 添加新闻管理功能"

# 查看提交历史
git log --oneline
```

### 4. 推送到远程

```bash
# 推送到 main 分支
git push origin main

# 或简写（如果已设置上游分支）
git push
```

### 5. 拉取远程更改

```bash
# 拉取并合并
git pull origin main

# 或简写
git pull
```

## 🌿 分支管理

### 创建和切换分支

```bash
# 创建新分支
git branch feature/new-feature

# 切换到新分支
git checkout feature/new-feature

# 或一步完成
git checkout -b feature/new-feature
```

### 合并分支

```bash
# 切换到 main 分支
git checkout main

# 合并 feature 分支
git merge feature/new-feature

# 删除已合并的分支
git branch -d feature/new-feature
```

## 📝 提交消息规范

使用语义化提交消息：

```bash
# 新功能
git commit -m "feat: 添加产品管理功能"

# 修复 Bug
git commit -m "fix: 修复新闻图片上传问题"

# 文档更新
git commit -m "docs: 更新 README 文档"

# 代码重构
git commit -m "refactor: 重构 API 路由结构"

# 样式调整
git commit -m "style: 统一代码格式"

# 性能优化
git commit -m "perf: 优化图片加载性能"

# 测试相关
git commit -m "test: 添加单元测试"

# 构建/工具
git commit -m "chore: 更新依赖包"
```

## 🔧 常见问题

### 问题 1: 推送被拒绝

```bash
# 强制推送（谨慎使用）
git push -f origin main

# 或先拉取再推送
git pull origin main
git push origin main
```

### 问题 2: 撤销更改

```bash
# 撤销工作区的更改
git checkout -- filename

# 撤销暂存区的更改
git reset HEAD filename

# 撤销最后一次提交（保留更改）
git reset --soft HEAD^

# 撤销最后一次提交（丢弃更改）
git reset --hard HEAD^
```

### 问题 3: 查看差异

```bash
# 查看工作区和暂存区的差异
git diff

# 查看暂存区和最后一次提交的差异
git diff --staged

# 查看两次提交的差异
git diff commit1 commit2
```

## 📋 上传前检查清单

- [ ] 已删除所有测试文件
- [ ] 已删除所有临时文档
- [ ] `.gitignore` 配置正确
- [ ] `node_modules` 未被提交
- [ ] `.env` 文件未被提交
- [ ] README.md 已更新
- [ ] 所有代码已测试
- [ ] 无编译错误
- [ ] 无 ESLint 错误

## 🚀 推送到 GitHub

```bash
# 1. 检查状态
git status

# 2. 添加所有文件
git add .

# 3. 提交
git commit -m "Initial commit: 完整的集团官网项目"

# 4. 添加远程仓库
git remote add origin https://github.com/yourusername/group-website.git

# 5. 推送
git push -u origin main
```

## 🎯 下一步

推送成功后：
1. 访问你的 GitHub 仓库确认文件已上传
2. 查看 [DEPLOYMENT.md](./DEPLOYMENT.md) 了解如何部署到 Vercel
3. 开始使用 [TESTING_CHECKLIST.md](./TESTING_CHECKLIST.md) 测试项目

## 📞 需要帮助？

- [Git 官方文档](https://git-scm.com/doc)
- [GitHub 帮助文档](https://docs.github.com)
- [Git 教程](https://www.atlassian.com/git/tutorials)

