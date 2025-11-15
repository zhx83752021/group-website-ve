import { Router, Request, Response, NextFunction } from 'express';
import * as contactDao from '../dao/contactDao.js';
import { authMiddleware } from '../middleware/auth.js';
import { ValidationError, NotFoundError } from '../middleware/errorHandler.js';

const router = Router();

// 提交联系表单（公开）
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, phone, company, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      throw new ValidationError('姓名、邮箱、主题和消息不能为空');
    }

    // 简单的邮箱验证
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new ValidationError('邮箱格式不正确');
    }

    const contact = await contactDao.createContact({
      name,
      email,
      phone,
      company,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: '感谢您的留言，我们会尽快回复',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
});

// 获取所有联系信息（需要认证）
router.get('/', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const limit = Math.min(parseInt(req.query.limit as string) || 20, 100);
    const offset = parseInt(req.query.offset as string) || 0;
    const status = req.query.status as string;

    let contacts;
    if (status) {
      contacts = await contactDao.getContactsByStatus(status as any);
    } else {
      contacts = await contactDao.getAllContacts(limit, offset);
    }

    res.json({ success: true, data: contacts, count: contacts.length });
  } catch (error) {
    next(error);
  }
});

// 获取联系信息详情（需要认证）
router.get('/:id', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const contact = await contactDao.getContactById(req.params.id);
    if (!contact) {
      throw new NotFoundError('联系信息不存在');
    }
    res.json({ success: true, data: contact });
  } catch (error) {
    next(error);
  }
});

// 更新联系信息状态（需要认证）
router.patch('/:id/status', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status } = req.body;
    if (!['pending', 'replied', 'resolved'].includes(status)) {
      throw new ValidationError('无效的状态');
    }

    const contact = await contactDao.updateContactStatus(req.params.id, status);
    if (!contact) {
      throw new NotFoundError('联系信息不存在');
    }
    res.json({ success: true, data: contact });
  } catch (error) {
    next(error);
  }
});

// 删除联系信息（需要认证）
router.delete('/:id', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const success = await contactDao.deleteContact(req.params.id);
    if (!success) {
      throw new NotFoundError('联系信息不存在');
    }
    res.json({ success: true, message: '删除成功' });
  } catch (error) {
    next(error);
  }
});

export default router;

