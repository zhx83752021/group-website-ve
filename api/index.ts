import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import cors from 'cors';

// 动态导入后端模块
let app: express.Application | null = null;
let initPromise: Promise<void> | null = null;

async function initializeApp() {
  if (app) return app;

  if (initPromise) {
    await initPromise;
    return app!;
  }

  initPromise = (async () => {
    const expressApp = express();

    // 中间件
    expressApp.use(cors({
      origin: '*',
      credentials: true
    }));
    expressApp.use(express.json({ limit: '50mb' }));
    expressApp.use(express.urlencoded({ extended: true, limit: '50mb' }));

    // 调试中间件 - 记录所有请求
    expressApp.use((req, res, next) => {
      console.log(`📥 ${req.method} ${req.url} - Path: ${req.path}`);
      next();
    });

    try {
      // 动态导入后端路由
      const { default: newsRoutes } = await import('../backend/src/routes/news.js');
      const { default: contactRoutes } = await import('../backend/src/routes/contact.js');
      const { default: businessRoutes } = await import('../backend/src/routes/business.js');
      const { default: authRoutes } = await import('../backend/src/routes/auth.js');
      const { default: productRoutes } = await import('../backend/src/routes/product.js');
      const { errorHandler } = await import('../backend/src/middleware/errorHandler.js');
      const { initializeDatabase } = await import('../backend/src/database/init.js');

      // 初始化数据库
      try {
        await initializeDatabase();
        console.log('✅ 数据库初始化成功');
      } catch (error) {
        console.error('⚠️ 数据库初始化失败:', error);
      }

      // 路由 - Vercel rewrites 会将 /api/* 转发到这个函数
      // 但请求的原始路径保持不变，所以我们需要匹配完整的 /api/* 路径
      expressApp.use('/api/news', newsRoutes);
      expressApp.use('/api/contact', contactRoutes);
      expressApp.use('/api/business', businessRoutes);
      expressApp.use('/api/product', productRoutes);
      expressApp.use('/api/auth', authRoutes);

      // 健康检查
      expressApp.get('/api/health', (req, res) => {
        res.json({
          status: 'ok',
          timestamp: new Date().toISOString(),
          message: 'API is running on Vercel',
          database: !!process.env.POSTGRES_URL || !!process.env.DATABASE_URL
        });
      });

      // 错误处理
      expressApp.use(errorHandler);

      // 404 处理
      expressApp.use((req, res) => {
        res.status(404).json({
          success: false,
          message: 'Route not found',
          path: req.path,
          method: req.method
        });
      });

      app = expressApp;
    } catch (error) {
      console.error('❌ 初始化应用失败:', error);

      // 创建一个简单的错误响应应用
      expressApp.all('*', (req, res) => {
        res.status(500).json({
          success: false,
          message: 'Server initialization failed',
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      });

      app = expressApp;
    }
  })();

  await initPromise;
  return app!;
}

// Vercel Serverless Function 导出
export default async (req: VercelRequest, res: VercelResponse) => {
  const expressApp = await initializeApp();
  return expressApp(req as any, res as any);
};

