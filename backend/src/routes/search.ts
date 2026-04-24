import express from 'express';
import { query } from '../database/config.js';

const router = express.Router();

/**
 * 全站搜索接口
 * 搜索范围：新闻 (news), 产品 (products), 案例 (cases), 业务 (business)
 */
router.get('/', async (req, res) => {
  const { keyword } = req.query;

  if (!keyword) {
    return res.status(400).json({ success: false, message: '请提供搜索关键词' });
  }

  const searchKeyword = `%${keyword}%`;
  const results = [];

  try {
    // 搜索新闻
    const newsResults = await query(
      'SELECT id, title as name, category, created_at FROM news WHERE title ILIKE $1 OR content ILIKE $1 LIMIT 5',
      [searchKeyword]
    );
    results.push(...newsResults.rows.map(item => ({ ...item, type: 'news', typeLabel: '新闻中心' })));

    // 搜索产品
    const productResults = await query(
      'SELECT id, name, category, description FROM products WHERE name ILIKE $1 OR description ILIKE $1 LIMIT 5',
      [searchKeyword]
    );
    results.push(...productResults.rows.map(item => ({ ...item, type: 'products', typeLabel: '产品展示' })));

    // 搜索业务
    const businessResults = await query(
      'SELECT id, name, description FROM business WHERE name ILIKE $1 OR description ILIKE $1 LIMIT 5',
      [searchKeyword]
    );
    results.push(...businessResults.rows.map(item => ({ ...item, type: 'business', typeLabel: '业务布局' })));

    res.json({ success: true, data: results });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
