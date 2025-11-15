import { Router, Request, Response, NextFunction } from 'express';
import jwt, { SignOptions } from 'jsonwebtoken';
import * as adminDao from '../dao/adminDao.js';
import { authMiddleware, AuthRequest } from '../middleware/auth.js';
import { ValidationError, UnauthorizedError } from '../middleware/errorHandler.js';

const router = Router();

// 管理员注册（仅第一次使用）
router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password, email } = req.body;

    if (!username || !password) {
      throw new ValidationError('用户名和密码不能为空');
    }

    if (password.length < 6) {
      throw new ValidationError('密码长度至少6位');
    }

    const existing = await adminDao.getAdminByUsername(username);
    if (existing) {
      throw new ValidationError('用户名已存在');
    }

    const admin = await adminDao.createAdmin(username, password, email);

    res.status(201).json({
      success: true,
      message: '注册成功',
      data: { id: admin.id, username: admin.username, email: admin.email },
    });
  } catch (error) {
    next(error);
  }
});

// 管理员登录
router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new ValidationError('用户名和密码不能为空');
    }

    const admin = await adminDao.getAdminByUsername(username);
    if (!admin) {
      throw new UnauthorizedError('用户名或密码错误');
    }

    const isValid = await adminDao.verifyPassword(password, admin.password);
    if (!isValid) {
      throw new UnauthorizedError('用户名或密码错误');
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: '登录成功',
      data: {
        token,
        admin: { id: admin.id, username: admin.username, email: admin.email },
      },
    });
  } catch (error) {
    next(error);
  }
});

// 获取当前用户信息
router.get('/me', authMiddleware, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const admin = await adminDao.getAdminById(req.user!.id);
    if (!admin) {
      throw new UnauthorizedError('用户不存在');
    }

    res.json({
      success: true,
      data: { id: admin.id, username: admin.username, email: admin.email },
    });
  } catch (error) {
    next(error);
  }
});

// 修改密码
router.post('/change-password', authMiddleware, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      throw new ValidationError('旧密码和新密码不能为空');
    }

    const admin = await adminDao.getAdminById(req.user!.id);
    if (!admin) {
      throw new UnauthorizedError('用户不存在');
    }

    const isValid = await adminDao.verifyPassword(oldPassword, admin.password);
    if (!isValid) {
      throw new UnauthorizedError('旧密码错误');
    }

    await adminDao.updateAdminPassword(admin.id, newPassword);

    res.json({ success: true, message: '密码修改成功' });
  } catch (error) {
    next(error);
  }
});

export default router;

