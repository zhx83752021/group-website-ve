import { Router, Request, Response, NextFunction } from 'express';
import * as newsDao from '../dao/newsDao.js';
import { authMiddleware } from '../middleware/auth.js';
import { ValidationError, NotFoundError } from '../middleware/errorHandler.js';

const router = Router();

// 获取所有新闻（公开）
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const limit = Math.min(parseInt(req.query.limit as string) || 10, 100);
    const offset = parseInt(req.query.offset as string) || 0;
    const category = req.query.category as string;

    let news;
    if (category) {
      news = await newsDao.getNewsByCategory(category, limit);
    } else {
      news = await newsDao.getAllNews(limit, offset);
    }

    res.json({
      success: true,
      data: news,
      count: news.length,
    });
  } catch (error) {
    next(error);
  }
});

// 获取新闻详情（公开）
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const news = await newsDao.getNewsById(req.params.id);
    if (!news) {
      throw new NotFoundError('新闻不存在');
    }
    res.json({ success: true, data: news });
  } catch (error) {
    next(error);
  }
});

// 创建新闻（需要认证）
router.post('/', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('📝 创建新闻请求:', {
      title: req.body.title,
      category: req.body.category,
      author: req.body.author,
      contentLength: req.body.content?.length || 0,
      hasImage: !!req.body.image_url,
      imageLength: req.body.image_url?.length || 0,
      imageType: req.body.image_url?.substring(0, 30) || 'none'
    });

    const { title, content, category, author, image_url } = req.body;

    if (!title || !content) {
      throw new ValidationError('标题和内容不能为空');
    }

    // 验证图片大小（如果有）
    if (image_url && image_url.length > 10 * 1024 * 1024) {
      throw new ValidationError('图片太大，请压缩后再上传（最大10MB）');
    }

    console.log('📊 准备插入数据库...');
    const news = await newsDao.createNews({
      title,
      content,
      category,
      author,
      image_url
    });

    console.log('✅ 新闻创建成功:', news.id);
    res.status(201).json({ success: true, data: news });
  } catch (error: any) {
    console.error('❌ 创建新闻失败:', error);
    console.error('错误详情:', {
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack?.split('\n').slice(0, 3)
    });
    next(error);
  }
});

// 更新新闻（需要认证）
router.put('/:id', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('📝 更新新闻请求:', {
      id: req.params.id,
      title: req.body.title,
      hasImage: !!req.body.image_url,
      imageLength: req.body.image_url?.length || 0
    });

    // 验证图片大小（如果有）
    if (req.body.image_url && req.body.image_url.length > 10 * 1024 * 1024) {
      throw new ValidationError('图片太大，请压缩后再上传（最大10MB）');
    }

    const news = await newsDao.updateNews(req.params.id, req.body);
    if (!news) {
      throw new NotFoundError('新闻不存在');
    }

    console.log('✅ 新闻更新成功:', news.id);
    res.json({ success: true, data: news });
  } catch (error: any) {
    console.error('❌ 更新新闻失败:', error);
    next(error);
  }
});

// 删除新闻（需要认证）
router.delete('/:id', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const success = await newsDao.deleteNews(req.params.id);
    if (!success) {
      throw new NotFoundError('新闻不存在');
    }
    res.json({ success: true, message: '删除成功' });
  } catch (error) {
    next(error);
  }
});

export default router;

