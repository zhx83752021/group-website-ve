import type { VercelRequest, VercelResponse } from '@vercel/node';

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
  console.log('📥 Login request:', {
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body
  });

  // 只允许 POST 请求
  if (req.method !== 'POST') {
    console.log('❌ Method not allowed:', req.method);
    return res.status(405).json({
      success: false,
      message: `Method ${req.method} not allowed. Use POST.`
    });
  }

  try {
    const { username, password } = req.body || {};

    console.log('✅ Login attempt:', { username });

    // 简单测试 - 先返回成功
    return res.status(200).json({
      success: true,
      message: '登录成功（测试）',
      data: {
        token: 'test-token-123',
        admin: {
          id: '1',
          username: username || 'test',
          email: 'test@example.com'
        }
      }
    });
  } catch (error) {
    console.error('❌ Login error:', error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Internal server error'
    });
  }
}

