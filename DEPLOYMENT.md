# 部署指南

本文档介绍如何将项目部署到 Vercel。

## 📋 部署前准备

### 1. 准备 GitHub 仓库

```bash
# 初始化 Git（如果还没有）
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit"

# 创建 GitHub 仓库后，添加远程仓库
git remote add origin https://github.com/yourusername/group-website.git

# 推送代码
git push -u origin main
```

### 2. 准备数据库

推荐使用以下云数据库服务之一：

#### 选项 A: Vercel Postgres（推荐）
1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 进入 Storage 标签
3. 创建 Postgres 数据库
4. 获取连接信息

#### 选项 B: Supabase
1. 访问 [Supabase](https://supabase.com)
2. 创建新项目
3. 获取数据库连接信息

#### 选项 C: Neon
1. 访问 [Neon](https://neon.tech)
2. 创建新项目
3. 获取连接字符串

## 🚀 部署后端 API

### 方法 1: 单独部署后端（推荐）

#### 1. 创建后端仓库

```bash
cd backend
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/group-website-api.git
git push -u origin main
```

#### 2. 在 Vercel 中部署

1. 访问 [Vercel](https://vercel.com)
2. 点击 "New Project"
3. 导入 `group-website-api` 仓库
4. Vercel 会自动检测配置

#### 3. 配置环境变量

在 Vercel 项目设置中添加以下环境变量：

```
DB_HOST=your-db-host
DB_PORT=5432
DB_NAME=your-db-name
DB_USER=your-db-user
DB_PASSWORD=your-db-password
JWT_SECRET=your-secret-key-min-32-characters
CORS_ORIGIN=https://your-frontend-domain.vercel.app
```

#### 4. 部署

点击 "Deploy" 按钮，Vercel 会自动构建和部署。

### 方法 2: Monorepo 部署

如果你想在一个仓库中同时部署前后端，需要配置 Vercel 的 monorepo 设置。

## 🌐 部署前端

### 1. 在 Vercel 中导入项目

1. 访问 [Vercel](https://vercel.com)
2. 点击 "New Project"
3. 导入 `group-website` 仓库
4. Vercel 会自动检测 Vite 项目

### 2. 配置构建设置

Vercel 会自动检测，但你也可以手动配置：

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 3. 配置环境变量

添加以下环境变量：

```
VITE_API_BASE_URL=https://your-api-domain.vercel.app/api
```

### 4. 部署

点击 "Deploy" 按钮。

## ✅ 部署后验证

### 1. 测试后端 API

```bash
# 测试健康检查
curl https://your-api-domain.vercel.app/api/health

# 测试获取新闻列表
curl https://your-api-domain.vercel.app/api/news
```

### 2. 测试前端

访问你的前端域名：
- 主页: `https://your-domain.vercel.app/`
- 管理后台: `https://your-domain.vercel.app/admin/login`

### 3. 测试管理后台

1. 访问 `/admin/login`
2. 使用默认账号登录：
   - 用户名: `admin`
   - 密码: `admin123`
3. 测试各项功能

## 🔧 常见问题

### 问题 1: 数据库连接失败

**解决方案**:
- 检查环境变量是否正确配置
- 确保数据库允许来自 Vercel 的连接
- 检查数据库连接字符串格式

### 问题 2: CORS 错误

**解决方案**:
- 确保后端的 `CORS_ORIGIN` 环境变量设置为前端域名
- 检查前端的 API 请求地址是否正确

### 问题 3: 构建失败

**解决方案**:
- 检查 `package.json` 中的依赖是否完整
- 查看 Vercel 构建日志
- 确保 TypeScript 编译无错误

### 问题 4: 环境变量不生效

**解决方案**:
- 前端环境变量必须以 `VITE_` 开头
- 修改环境变量后需要重新部署
- 检查变量名是否拼写正确

## 📝 部署检查清单

- [ ] 代码已推送到 GitHub
- [ ] 数据库已创建并可访问
- [ ] 后端环境变量已配置
- [ ] 前端环境变量已配置
- [ ] 后端 API 部署成功
- [ ] 前端部署成功
- [ ] API 健康检查通过
- [ ] 前端可以访问
- [ ] 管理后台可以登录
- [ ] 所有功能测试通过

## 🔄 更新部署

### 自动部署

Vercel 会自动监听 GitHub 仓库的变化：
- 推送到 `main` 分支会触发生产环境部署
- 推送到其他分支会创建预览部署

### 手动部署

```bash
# 提交更改
git add .
git commit -m "Update: description"
git push

# Vercel 会自动开始部署
```

## 🎯 生产环境优化

### 1. 性能优化
- 启用 Vercel 的 Edge Network
- 配置缓存策略
- 压缩静态资源

### 2. 安全优化
- 修改默认管理员密码
- 使用强 JWT 密钥
- 启用 HTTPS（Vercel 自动提供）

### 3. 监控
- 使用 Vercel Analytics
- 配置错误追踪
- 设置性能监控

## 📞 需要帮助？

- [Vercel 文档](https://vercel.com/docs)
- [GitHub Issues](https://github.com/yourusername/group-website/issues)

