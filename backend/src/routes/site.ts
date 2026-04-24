import express from 'express';
import { query } from '../database/config.js';

const router = express.Router();

/**
 * 获取发展历程
 */
router.get('/timeline', async (req, res) => {
  try {
    const result = await query('SELECT * FROM timeline ORDER BY order_index ASC, year ASC');
    res.json({ success: true, data: result.rows });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * 获取荣誉资质
 */
router.get('/honors', async (req, res) => {
  try {
    const result = await query('SELECT * FROM honors ORDER BY order_index ASC');
    res.json({ success: true, data: result.rows });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * 获取成功案例
 */
router.get('/cases', async (req, res) => {
  try {
    const result = await query('SELECT * FROM cases ORDER BY order_index ASC');
    const cases = result.rows.map(item => ({
      ...item,
      image: item.image_url,
      stats: item.stats ? item.stats.split(',') : []
    }));
    res.json({ success: true, data: cases });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * 获取站点全局配置
 */
router.get('/config', async (req, res) => {
  try {
    const result = await query('SELECT * FROM site_config');
    // 转换为键值对象方便使用
    const config: Record<string, string> = {};
    result.rows.forEach(row => {
      config[row.key] = row.value;
    });
    res.json({ success: true, data: config });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * 更新站点配置 (仅限管理)
 * 这里暂时不做复杂的权限校验逻辑，实际项目中需配合 auth 中间件
 */
router.post('/config', async (req, res) => {
  const configs = req.body; // { key1: value1, key2: value2 }
  try {
    for (const [key, value] of Object.entries(configs)) {
      await query(
        'INSERT INTO site_config (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = $2, updated_at = CURRENT_TIMESTAMP',
        [key, value]
      );
    }
    res.json({ success: true, message: '配置已更新' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
