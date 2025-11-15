import { query } from '../database/config.js';
import { v4 as uuidv4 } from 'uuid';

export interface Business {
  id: string;
  name: string;
  description?: string;
  icon_url?: string;
  order_index?: number;
  created_at: Date;
  updated_at: Date;
}

export async function getAllBusiness(limit = 50): Promise<Business[]> {
  const result = await query(
    'SELECT * FROM business ORDER BY order_index ASC, created_at DESC LIMIT $1',
    [limit]
  );
  return result.rows;
}

export async function getBusinessById(id: string): Promise<Business | null> {
  const result = await query('SELECT * FROM business WHERE id = $1', [id]);
  return result.rows[0] || null;
}

export async function createBusiness(data: Omit<Business, 'id' | 'created_at' | 'updated_at'>): Promise<Business> {
  const id = uuidv4();
  const result = await query(
    `INSERT INTO business (id, name, description, icon_url, order_index)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [id, data.name, data.description, data.icon_url, data.order_index]
  );
  return result.rows[0];
}

export async function updateBusiness(id: string, data: Partial<Business>): Promise<Business | null> {
  // 过滤掉不应该更新的字段
  const fields = Object.keys(data).filter(k =>
    k !== 'id' &&
    k !== 'created_at' &&
    k !== 'updated_at'
  );

  if (fields.length === 0) {
    // 如果没有字段需要更新，直接返回当前记录
    const result = await query('SELECT * FROM business WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  const values = fields.map(f => data[f as keyof Business]);
  values.push(id);

  const setClause = fields.map((f, i) => `${f} = $${i + 1}`).join(', ');
  const result = await query(
    `UPDATE business SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = $${fields.length + 1} RETURNING *`,
    values
  );

  return result.rows[0] || null;
}

export async function deleteBusiness(id: string): Promise<boolean> {
  const result = await query('DELETE FROM business WHERE id = $1', [id]);
  return result.rowCount! > 0;
}

