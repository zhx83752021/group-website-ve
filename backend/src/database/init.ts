import { query } from './config.js';
import { seedDatabase } from './seed.js';

export async function initializeDatabase() {
  try {
    console.log('初始化数据库...');

    // 创建新闻表
    await query(`
      CREATE TABLE IF NOT EXISTS news (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        category VARCHAR(50),
        author VARCHAR(100),
        image_url TEXT,
        views INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 创建联系表单表
    await query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        company VARCHAR(100),
        subject VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        status VARCHAR(20) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 创建业务信息表
    await query(`
      CREATE TABLE IF NOT EXISTS business (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        description TEXT,
        icon_url TEXT,
        order_index INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 创建管理员表
    await query(`
      CREATE TABLE IF NOT EXISTS admins (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        username VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 创建产品表
    await query(`
      CREATE TABLE IF NOT EXISTS products (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        description TEXT,
        category VARCHAR(100),
        price DECIMAL(10, 2),
        image_url TEXT,
        features TEXT,
        order_index INT,
        status VARCHAR(20) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('✅ 数据库初始化完成');

    // 迁移：将 image_url 和 icon_url 字段从 VARCHAR(500) 改为 TEXT 以支持 Base64 图片
    console.log('检查并执行数据库迁移...');
    try {
      await query(`ALTER TABLE products ALTER COLUMN image_url TYPE TEXT`);
      console.log('✅ products.image_url 已迁移为 TEXT');
    } catch (error: any) {
      if (error.code !== '42804') { // 42804 = datatype mismatch (已经是 TEXT)
        console.log('ℹ️ products.image_url 迁移跳过:', error.message);
      }
    }

    try {
      await query(`ALTER TABLE news ALTER COLUMN image_url TYPE TEXT`);
      console.log('✅ news.image_url 已迁移为 TEXT');
    } catch (error: any) {
      if (error.code !== '42804') {
        console.log('ℹ️ news.image_url 迁移跳过:', error.message);
      }
    }

    try {
      await query(`ALTER TABLE business ALTER COLUMN icon_url TYPE TEXT`);
      console.log('✅ business.icon_url 已迁移为 TEXT');
    } catch (error: any) {
      if (error.code !== '42804') {
        console.log('ℹ️ business.icon_url 迁移跳过:', error.message);
      }
    }

    // 填充示例数据
    await seedDatabase();
  } catch (error) {
    console.error('❌ 数据库初始化失败:', error);
    throw error;
  }
}

