# 集团网站后端 API 服务

基于 Node.js + Express + TypeScript 的企业网站后端服务

## 🚀 快速开始

### 前置要求
- Node.js 16+
- PostgreSQL 12+
- npm 或 yarn

### 安装依赖
```bash
cd backend
npm install
```

### 配置环境变量
```bash
cp .env.example .env
# 编辑 .env 文件，配置数据库连接信息
```

### 启动开发服务器
```bash
npm run dev
```

服务器将运行在 `http://localhost:3000`

### 构建生产版本
```bash
npm run build
npm start
```

## 📁 项目结构

```
backend/
├── src/
│   ├── index.ts              # 应用入口
│   ├── database/
│   │   ├── config.ts         # 数据库连接配置
│   │   └── init.ts           # 数据库初始化脚本
│   ├── middleware/
│   │   ├── logger.ts         # 日志中间件
│   │   ├── errorHandler.ts   # 错误处理中间件
│   │   └── auth.ts           # 认证中间件
│   ├── dao/
│   │   ├── newsDao.ts        # 新闻数据访问层
│   │   ├── contactDao.ts     # 联系表单数据访问层
│   │   ├── businessDao.ts    # 业务信息数据访问层
│   │   └── adminDao.ts       # 管理员数据访问层
│   └── routes/
│       ├── news.ts           # 新闻路由
│       ├── contact.ts        # 联系表单路由
│       ├── business.ts       # 业务信息路由
│       └── auth.ts           # 认证路由
├── dist/                     # 编译输出目录
├── package.json
├── tsconfig.json
└── .env.example
```

## 🔌 API 端点

### 新闻管理
- `GET /api/news` - 获取新闻列表
- `GET /api/news/:id` - 获取新闻详情
- `POST /api/news` - 创建新闻（需认证）
- `PUT /api/news/:id` - 更新新闻（需认证）
- `DELETE /api/news/:id` - 删除新闻（需认证）

### 联系表单
- `POST /api/contact` - 提交联系表单
- `GET /api/contact` - 获取所有联系信息（需认证）
- `GET /api/contact/:id` - 获取联系信息详情（需认证）
- `PATCH /api/contact/:id/status` - 更新状态（需认证）
- `DELETE /api/contact/:id` - 删除联系信息（需认证）

### 业务信息
- `GET /api/business` - 获取业务列表
- `GET /api/business/:id` - 获取业务详情
- `POST /api/business` - 创建业务（需认证）
- `PUT /api/business/:id` - 更新业务（需认证）
- `DELETE /api/business/:id` - 删除业务（需认证）

### 认证
- `POST /api/auth/register` - 管理员注册
- `POST /api/auth/login` - 管理员登录
- `GET /api/auth/me` - 获取当前用户信息（需认证）
- `POST /api/auth/change-password` - 修改密码（需认证）

## 🔐 认证方式

使用 JWT (JSON Web Token) 进行认证。

### 登录获取 Token
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password"}'
```

### 使用 Token 调用受保护的 API
```bash
curl -X GET http://localhost:3000/api/news \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 📊 数据库模型

### News（新闻表）
- id: UUID
- title: 标题
- content: 内容
- category: 分类
- author: 作者
- image_url: 图片URL
- views: 浏览次数
- created_at: 创建时间
- updated_at: 更新时间

### Contacts（联系表单表）
- id: UUID
- name: 姓名
- email: 邮箱
- phone: 电话
- company: 公司
- subject: 主题
- message: 消息
- status: 状态（pending/replied/resolved）
- created_at: 创建时间
- updated_at: 更新时间

### Business（业务信息表）
- id: UUID
- name: 业务名称
- description: 描述
- icon_url: 图标URL
- order_index: 排序
- created_at: 创建时间
- updated_at: 更新时间

### Admins（管理员表）
- id: UUID
- username: 用户名
- password: 密码（加密）
- email: 邮箱
- created_at: 创建时间
- updated_at: 更新时间

## 🛠️ 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Node.js | 16+ | 运行时 |
| Express | 4.18+ | Web框架 |
| TypeScript | 5.3+ | 类型安全 |
| PostgreSQL | 12+ | 数据库 |
| JWT | 9.1+ | 认证 |
| bcryptjs | 2.4+ | 密码加密 |

## 📝 开发指南

### 添加新的 API 端点

1. 在 `src/dao/` 中创建数据访问层
2. 在 `src/routes/` 中创建路由文件
3. 在 `src/index.ts` 中注册路由

### 错误处理

使用自定义错误类：
```typescript
import { ValidationError, NotFoundError } from '../middleware/errorHandler.js';

throw new ValidationError('字段验证失败');
throw new NotFoundError('资源不存在');
```

## 🚀 部署

### Vercel 部署

1. 连接 GitHub 仓库到 Vercel
2. 配置环境变量
3. 设置构建命令：`npm run build`
4. 设置启动命令：`npm start`

## 📞 支持

如有问题，请提交 Issue 或联系开发团队。

