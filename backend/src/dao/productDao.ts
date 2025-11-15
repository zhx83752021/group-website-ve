import { query } from '../database/config.js';

export interface Product {
  id?: string;
  name: string;
  description?: string;
  category?: string;
  price?: number;
  image_url?: string;
  features?: string;
  order_index?: number;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export const productDao = {
  // 获取所有产品
  async getAllProducts(limit = 50, offset = 0, category?: string) {
    let sql = 'SELECT * FROM products';
    const params: any[] = [];

    if (category) {
      sql += ' WHERE category = $1';
      params.push(category);
    }

    sql += ' ORDER BY order_index ASC, created_at DESC LIMIT $' + (params.length + 1) + ' OFFSET $' + (params.length + 2);
    params.push(limit, offset);

    const result = await query(sql, params);
    return result.rows;
  },

  // 获取产品详情
  async getProductById(id: string) {
    const result = await query('SELECT * FROM products WHERE id = $1', [id]);
    return result.rows[0];
  },

  // 创建产品
  async createProduct(product: Product) {
    const { name, description, category, price, image_url, features, order_index, status } = product;
    const result = await query(
      `INSERT INTO products (name, description, category, price, image_url, features, order_index, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [name, description, category, price, image_url, features, order_index, status || 'active']
    );
    return result.rows[0];
  },

  // 更新产品
  async updateProduct(id: string, product: Partial<Product>) {
    // 过滤掉不应该更新的字段
    const fields = Object.keys(product).filter(k =>
      k !== 'id' &&
      k !== 'created_at' &&
      k !== 'updated_at'
    );

    if (fields.length === 0) {
      // 如果没有字段需要更新，直接返回当前记录
      const result = await query('SELECT * FROM products WHERE id = $1', [id]);
      return result.rows[0] || null;
    }

    const values = fields.map(f => product[f as keyof Product]);
    values.push(id);

    const setClause = fields.map((f, i) => `${f} = $${i + 1}`).join(', ');
    const result = await query(
      `UPDATE products SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = $${fields.length + 1} RETURNING *`,
      values
    );
    return result.rows[0];
  },

  // 删除产品
  async deleteProduct(id: string) {
    const result = await query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  },

  // 按分类获取产品
  async getProductsByCategory(category: string, limit = 50) {
    const result = await query(
      'SELECT * FROM products WHERE category = $1 ORDER BY order_index ASC LIMIT $2',
      [category, limit]
    );
    return result.rows;
  },

  // 获取活跃产品
  async getActiveProducts(limit = 50) {
    const result = await query(
      'SELECT * FROM products WHERE status = $1 ORDER BY order_index ASC LIMIT $2',
      ['active', limit]
    );
    return result.rows;
  },

  // 获取产品总数
  async getProductCount() {
    const result = await query('SELECT COUNT(*) as count FROM products');
    return parseInt(result.rows[0].count, 10);
  },

  // 获取产品分类列表
  async getProductCategories() {
    const result = await query(
      'SELECT DISTINCT category FROM products WHERE category IS NOT NULL ORDER BY category'
    );
    return result.rows.map((row: any) => row.category);
  }
};

export default productDao;

