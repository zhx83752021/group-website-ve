# API 使用示例

## 🔐 认证相关

### 1. 管理员登录
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123"
  }'
```

**响应**:
```json
{
  "success": true,
  "message": "登录成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "admin": {
      "id": "uuid",
      "username": "admin",
      "email": "admin@group.com"
    }
  }
}
```

### 2. 获取当前用户信息
```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 📰 新闻管理

### 1. 获取新闻列表
```bash
curl http://localhost:3000/api/news?limit=10&offset=0
```

### 2. 获取特定分类的新闻
```bash
curl "http://localhost:3000/api/news?category=公司新闻"
```

### 3. 获取新闻详情
```bash
curl http://localhost:3000/api/news/{news_id}
```

### 4. 创建新闻（需要认证）
```bash
curl -X POST http://localhost:3000/api/news \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "新闻标题",
    "content": "新闻内容详情...",
    "category": "公司新闻",
    "author": "作者名称",
    "image_url": "https://example.com/image.jpg"
  }'
```

### 5. 更新新闻（需要认证）
```bash
curl -X PUT http://localhost:3000/api/news/{news_id} \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "更新后的标题",
    "content": "更新后的内容"
  }'
```

### 6. 删除新闻（需要认证）
```bash
curl -X DELETE http://localhost:3000/api/news/{news_id} \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 📧 联系表单

### 1. 提交联系表单（公开）
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "张三",
    "email": "zhangsan@example.com",
    "phone": "13800138000",
    "company": "ABC公司",
    "subject": "产品咨询",
    "message": "我想了解贵公司的云计算服务..."
  }'
```

### 2. 获取所有联系信息（需要认证）
```bash
curl http://localhost:3000/api/contact \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 3. 按状态筛选联系信息（需要认证）
```bash
curl "http://localhost:3000/api/contact?status=pending" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 4. 更新联系信息状态（需要认证）
```bash
curl -X PATCH http://localhost:3000/api/contact/{contact_id}/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "status": "replied"
  }'
```

## 🏢 业务信息

### 1. 获取业务列表
```bash
curl http://localhost:3000/api/business
```

### 2. 获取业务详情
```bash
curl http://localhost:3000/api/business/{business_id}
```

### 3. 创建业务（需要认证）
```bash
curl -X POST http://localhost:3000/api/business \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "云计算服务",
    "description": "提供企业级云计算解决方案",
    "icon_url": "https://example.com/icon.png",
    "order_index": 1
  }'
```

### 4. 更新业务（需要认证）
```bash
curl -X PUT http://localhost:3000/api/business/{business_id} \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "description": "更新的描述"
  }'
```

## 💡 使用 JavaScript/Axios 调用

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
});

// 登录
const loginResponse = await api.post('/auth/login', {
  username: 'admin',
  password: 'admin123'
});

const token = loginResponse.data.data.token;

// 设置认证头
api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

// 获取新闻
const newsResponse = await api.get('/news');
console.log(newsResponse.data);

// 创建新闻
const newNews = await api.post('/news', {
  title: '新闻标题',
  content: '新闻内容',
  category: '公司新闻'
});
```

