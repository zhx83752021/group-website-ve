import { query } from '../database/config.js';
import { v4 as uuidv4 } from 'uuid';

export interface News {
  id: string;
  title: string;
  content: string;
  category?: string;
  author?: string;
  image_url?: string;
  views: number;
  created_at: Date;
  updated_at: Date;
}

export async function getAllNews(limit = 10, offset = 0): Promise<News[]> {
  const result = await query(
    'SELECT * FROM news ORDER BY created_at DESC LIMIT $1 OFFSET $2',
    [limit, offset]
  );
  return result.rows;
}

export async function getNewsById(id: string): Promise<News | null> {
  const result = await query('SELECT * FROM news WHERE id = $1', [id]);
  if (result.rows.length === 0) return null;

  // 增加浏览次数
  await query('UPDATE news SET views = views + 1 WHERE id = $1', [id]);

  return result.rows[0];
}

export async function createNews(data: Omit<News, 'id' | 'views' | 'created_at' | 'updated_at'>): Promise<News> {
  const id = uuidv4();
  const result = await query(
    `INSERT INTO news (id, title, content, category, author, image_url, views, created_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
     RETURNING *`,
    [id, data.title, data.content, data.category, data.author, data.image_url]
  );
  return result.rows[0];
}

export async function updateNews(id: string, data: Partial<News>): Promise<News | null> {
  // 过滤掉不应该更新的字段
  const fields = Object.keys(data).filter(k =>
    k !== 'id' &&
    k !== 'created_at' &&
    k !== 'updated_at' &&
    k !== 'views'
  );

  if (fields.length === 0) {
    // 如果没有字段需要更新，直接返回当前记录
    const result = await query('SELECT * FROM news WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  const values = fields.map(f => data[f as keyof News]);
  values.push(id);

  const setClause = fields.map((f, i) => `${f} = $${i + 1}`).join(', ');
  const result = await query(
    `UPDATE news SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = $${fields.length + 1} RETURNING *`,
    values
  );

  return result.rows[0] || null;
}

export async function deleteNews(id: string): Promise<boolean> {
  const result = await query('DELETE FROM news WHERE id = $1', [id]);
  return result.rowCount! > 0;
}

export async function getNewsByCategory(category: string, limit = 10): Promise<News[]> {
  const result = await query(
    'SELECT * FROM news WHERE category = $1 ORDER BY created_at DESC LIMIT $2',
    [category, limit]
  );
  return result.rows;
}

