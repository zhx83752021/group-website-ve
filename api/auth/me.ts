import type { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  // 处理 OPTIONS 预检请求
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 记录请求信息用于调试
  console.log('📥 Get Me request:', {
    method: req.method,
    url: req.url,
    headers: req.headers
  });

  // 只允许 GET 请求
  if (req.method !== 'GET') {
    console.log('❌ Method not allowed:', req.method);
    return res.status(405).json({
      success: false,
      message: `Method ${req.method} not allowed. Use GET.`
    });
  }

  try {
    // 获取 token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('❌ No token provided');
      return res.status(401).json({
        success: false,
        message: '缺少认证令牌'
      });
    }

    const token = authHeader.split(' ')[1];
    console.log('🔑 Token received:', token.substring(0, 20) + '...');

    // 验证 token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any;
      console.log('✅ Token verified:', decoded);

      // 返回用户信息
      return res.status(200).json({
        success: true,
        data: {
          id: decoded.id || '1',
          username: decoded.username || 'admin',
          email: decoded.email || 'admin@example.com'
        }
      });
    } catch (jwtError) {
      console.error('❌ Token verification failed:', jwtError);
      
      // 如果是测试 token，直接返回测试用户信息
      if (token === 'test-token-123') {
        console.log('✅ Using test token');
        return res.status(200).json({
          success: true,
          data: {
            id: '1',
            username: 'admin',
            email: 'admin@example.com'
          }
        });
      }

      return res.status(401).json({
        success: false,
        message: '无效的令牌'
      });
    }
  } catch (error) {
    console.error('❌ Get Me error:', error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Internal server error'
    });
  }
}

