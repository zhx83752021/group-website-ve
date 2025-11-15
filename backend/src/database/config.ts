import pg from 'pg';
import dotenv from 'dotenv';

// 确保环境变量已加载
dotenv.config();

const { Pool } = pg;

// 支持 Vercel Postgres 和传统配置
const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;

export const pool = connectionString
  ? new Pool({
    connectionString,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
  })
  : new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'group_website',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
  });

pool.on('error', (err: Error) => {
  console.error('数据库连接池错误:', err);
});

export async function query(text: string, params?: any[]) {
  const start = Date.now();
  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('执行查询', { text, duration, rows: result.rowCount });
    return result;
  } catch (error) {
    console.error('查询错误:', error);
    throw error;
  }
}

export async function getClient() {
  return pool.connect();
}

