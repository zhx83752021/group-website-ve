import { Router, Request, Response } from 'express';
import { productDao } from '../dao/productDao.js';
import { authMiddleware, AuthRequest } from '../middleware/auth.js';

const router = Router();

// 获取产品列表 (公开)
router.get('/', async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = parseInt(req.query.offset as string) || 0;
    const category = req.query.category as string;

    const products = await productDao.getAllProducts(limit, offset, category);
    const total = await productDao.getProductCount();

    res.json({
      success: true,
      data: products,
      pagination: {
        limit,
        offset,
        total
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: '获取产品列表失败' });
  }
});

// 获取产品详情 (公开)
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const product = await productDao.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, error: '产品不存在' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: '获取产品详情失败' });
  }
});

// 创建产品 (需认证)
router.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, category, price, image_url, features, order_index, status } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, error: '产品名称不能为空' });
    }

    const product = await productDao.createProduct({
      name,
      description,
      category,
      price,
      image_url,
      features,
      order_index,
      status
    });

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    console.error('创建产品失败:', error);
    res.status(500).json({ success: false, error: '创建产品失败', details: error instanceof Error ? error.message : String(error) });
  }
});

// 更新产品 (需认证)
router.put('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const product = await productDao.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, error: '产品不存在' });
    }

    const updated = await productDao.updateProduct(req.params.id, req.body);
    res.json({ success: true, data: updated });
  } catch (error) {
    console.error('更新产品失败:', error);
    res.status(500).json({ success: false, error: '更新产品失败', details: error instanceof Error ? error.message : String(error) });
  }
});

// 删除产品 (需认证)
router.delete('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const product = await productDao.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, error: '产品不存在' });
    }

    await productDao.deleteProduct(req.params.id);
    res.json({ success: true, message: '产品已删除' });
  } catch (error) {
    res.status(500).json({ success: false, error: '删除产品失败' });
  }
});

// 按分类获取产品 (公开)
router.get('/category/:category', async (req: Request, res: Response) => {
  try {
    const products = await productDao.getProductsByCategory(req.params.category);
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, error: '获取分类产品失败' });
  }
});

// 获取产品分类列表 (公开)
router.get('/categories/list', async (req: Request, res: Response) => {
  try {
    const categories = await productDao.getProductCategories();
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, error: '获取分类列表失败' });
  }
});

export default router;

