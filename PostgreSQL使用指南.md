# PostgreSQL 使用指南 - 集团官网项目

本文档为不懂数据库操作的用户提供详细的PostgreSQL启动和使用说明。

## 📋 目录
1. [PostgreSQL安装](#postgresql安装)
2. [启动PostgreSQL](#启动postgresql)
3. [创建数据库](#创建数据库)
4. [项目启动](#项目启动)
5. [常见问题](#常见问题)
6. [数据库操作](#数据库操作)

---

## PostgreSQL安装

### Windows系统安装步骤

1. **下载PostgreSQL**
   - 访问官网: https://www.postgresql.org/download/windows/
   - 下载最新版本（推荐15.x或更高版本）

2. **运行安装程序**
   - 双击下载的 `.exe` 文件
   - 选择安装路径（默认即可）
   - 设置超级用户密码（**重要**：记住这个密码，默认用户名是 `postgres`）
   - 选择端口（默认 `5432`）
   - 完成安装

3. **验证安装**
   - 打开命令行，输入：
   ```bash
   psql --version
   ```
   - 如果显示版本号，说明安装成功

---

## 启动PostgreSQL

### 方式一：自动启动（推荐）

项目已提供启动脚本，直接运行：

**Windows Batch 脚本：**
```bash
start-all.bat
```

**Windows PowerShell 脚本：**
```bash
start-all.ps1
```

这些脚本会自动：
- ✅ 启动PostgreSQL服务
- ✅ 创建数据库（如果不存在）
- ✅ 启动后端服务
- ✅ 启动前端服务

### 方式二：手动启动

#### 1. 启动PostgreSQL服务

**Windows 服务管理器方式：**
- 按 `Win + R`，输入 `services.msc`
- 找到 `postgresql-x64-15`（或类似名称）
- 右键选择 "启动"

**命令行方式：**
```bash
net start postgresql-x64-15
```

#### 2. 验证PostgreSQL是否运行

```bash
tasklist | find /i "postgres"
```

如果显示 `postgres.exe`，说明服务已启动。

---

## 创建数据库

### 自动创建（推荐）

项目启动时会自动创建数据库和表。只需运行：
```bash
start-all.bat
```

### 手动创建

如果需要手动创建，按以下步骤：

#### 1. 打开PostgreSQL命令行

```bash
psql -U postgres
```

输入超级用户密码（安装时设置的密码）

#### 2. 创建数据库

```sql
CREATE DATABASE group_website;
```

#### 3. 连接到新数据库

```sql
\c group_website
```

#### 4. 创建表（项目启动时自动创建）

项目会自动创建以下表：
- `news` - 新闻表
- `contacts` - 联系表单表
- `business` - 业务信息表
- `admins` - 管理员表
- `products` - 产品表

#### 5. 退出PostgreSQL

```sql
\q
```

---

## 项目启动

### 完整启动流程

#### 第一步：配置环境变量

1. 进入 `backend` 文件夹
2. 复制 `.env.example` 为 `.env`
3. 编辑 `.env` 文件，确保数据库配置正确：

```env
# 数据库配置
DB_HOST=localhost
DB_PORT=5432
DB_NAME=group_website
DB_USER=postgres
DB_PASSWORD=postgres  # 改为你安装时设置的密码
```

#### 第二步：启动所有服务

**方式一：一键启动（推荐）**
```bash
start-all.bat
```

**方式二：分别启动**

打开两个命令行窗口：

窗口1 - 启动后端：
```bash
cd backend
npm run dev
```

窗口2 - 启动前端：
```bash
npm run dev
```

#### 第三步：访问应用

- 📍 公开网站: http://localhost:5173
- 📍 管理后台: http://localhost:5173/admin/login
- 📍 后端API: http://localhost:3000/api

**默认登录凭证：**
- 用户名: `admin`
- 密码: `admin123`

---

## 常见问题

### Q1: 启动时提示 "PostgreSQL 未运行"

**解决方案：**
1. 打开服务管理器 (`services.msc`)
2. 找到 `postgresql-x64-15`
3. 右键选择 "启动"
4. 重新运行启动脚本

### Q2: 提示 "数据库连接失败"

**检查清单：**
- [ ] PostgreSQL 服务已启动
- [ ] `.env` 文件中的数据库配置正确
- [ ] 数据库 `group_website` 已创建
- [ ] 用户名和密码正确

**测试连接：**
```bash
cd backend
npm run test-connection
```

### Q3: 提示 "密码错误"

**解决方案：**
1. 打开 `.env` 文件
2. 检查 `DB_PASSWORD` 是否与安装时设置的密码一致
3. 如果忘记密码，需要重新安装PostgreSQL

### Q4: 端口被占用

如果 `5432` 端口被占用：
1. 修改 `.env` 中的 `DB_PORT`
2. 确保新端口未被占用

---

## 数据库操作

### 连接到数据库

```bash
psql -U postgres -d group_website
```

### 常用SQL命令

**查看所有表：**
```sql
\dt
```

**查看表结构：**
```sql
\d news
```

**查看数据：**
```sql
SELECT * FROM news;
```

**查看管理员：**
```sql
SELECT * FROM admins;
```

**清空表数据（谨慎使用）：**
```sql
DELETE FROM news;
```

**删除表：**
```sql
DROP TABLE news;
```

### 使用图形化工具（推荐）

如果不想用命令行，可以使用图形化工具：

1. **pgAdmin** - PostgreSQL官方工具
   - 下载: https://www.pgadmin.org/download/
   - 安装后可视化管理数据库

2. **DBeaver** - 功能强大的数据库工具
   - 下载: https://dbeaver.io/download/
   - 支持多种数据库

---

## 停止服务

### 停止PostgreSQL

**命令行方式：**
```bash
net stop postgresql-x64-15
```

**服务管理器方式：**
- 打开 `services.msc`
- 找到 `postgresql-x64-15`
- 右键选择 "停止"

---

## 获取帮助

如果遇到问题：

1. 查看项目日志
2. 运行测试连接脚本：`npm run test-connection`
3. 检查 `.env` 配置文件
4. 查看PostgreSQL官方文档：https://www.postgresql.org/docs/

---

**祝你使用愉快！** 🎉

