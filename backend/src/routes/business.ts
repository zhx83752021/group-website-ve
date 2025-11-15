import { Router, Request, Response, NextFunction } from 'express';
import * as businessDao from '../dao/businessDao.js';
import { authMiddleware } from '../middleware/auth.js';
import { ValidationError, NotFoundError } from '../middleware/errorHandler.js';

const router = Router();

// 获取所有业务信息（公开）
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const limit = Math.min(parseInt(req.query.limit as string) || 50, 100);
    const business = await businessDao.getAllBusiness(limit);
    res.json({ success: true, data: business, count: business.length });
  } catch (error) {
    next(error);
  }
});

// 获取业务信息详情（公开）
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const business = await businessDao.getBusinessById(req.params.id);
    if (!business) {
      throw new NotFoundError('业务信息不存在');
    }
    res.json({ success: true, data: business });
  } catch (error) {
    next(error);
  }
});

// 创建业务信息（需要认证）
router.post('/', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, icon_url, order_index } = req.body;

    if (!name) {
      throw new ValidationError('业务名称不能为空');
    }

    const business = await businessDao.createBusiness({
      name,
      description,
      icon_url,
      order_index,
    });

    res.status(201).json({ success: true, data: business });
  } catch (error) {
    next(error);
  }
});

// 更新业务信息（需要认证）
router.put('/:id', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const business = await businessDao.updateBusiness(req.params.id, req.body);
    if (!business) {
      throw new NotFoundError('业务信息不存在');
    }
    res.json({ success: true, data: business });
  } catch (error) {
    next(error);
  }
});

// 删除业务信息（需要认证）
router.delete('/:id', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const success = await businessDao.deleteBusiness(req.params.id);
    if (!success) {
      throw new NotFoundError('业务信息不存在');
    }
    res.json({ success: true, message: '删除成功' });
  } catch (error) {
    next(error);
  }
});

export default router;

