import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeDatabase } from './database/init.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './middleware/logger.js';
import newsRoutes from './routes/news.js';
import contactRoutes from './routes/contact.js';
import businessRoutes from './routes/business.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/product.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
// 增加请求体大小限制以支持图片上传（Base64编码）
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(logger);

// 路由
app.use('/api/news', newsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/business', businessRoutes);
app.use('/api/product', productRoutes);
app.use('/api/auth', authRoutes);

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 错误处理
app.use(errorHandler);

// 启动服务器
async function start() {
  try {
    await initializeDatabase();
    console.log('✅ 数据库初始化成功');
  } catch (error) {
    console.error('⚠️ 数据库初始化失败，但服务器仍将启动:', error);
    console.error('请确保 PostgreSQL 正在运行，并且数据库配置正确');
  }

  app.listen(PORT, () => {
    console.log(`✅ 服务器运行在 http://localhost:${PORT}`);
  });
}

start();

