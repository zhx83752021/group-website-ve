import { query } from '../database/config.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

export interface Admin {
  id: string;
  username: string;
  password: string;
  email?: string;
  created_at: Date;
  updated_at: Date;
}

export async function getAdminByUsername(username: string): Promise<Admin | null> {
  const result = await query('SELECT * FROM admins WHERE username = $1', [username]);
  return result.rows[0] || null;
}

export async function getAdminById(id: string): Promise<Admin | null> {
  const result = await query('SELECT * FROM admins WHERE id = $1', [id]);
  return result.rows[0] || null;
}

export async function createAdmin(username: string, password: string, email?: string): Promise<Admin> {
  const id = uuidv4();
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const result = await query(
    `INSERT INTO admins (id, username, password, email)
     VALUES ($1, $2, $3, $4)
     RETURNING id, username, email, created_at, updated_at`,
    [id, username, hashedPassword, email]
  );
  
  return result.rows[0];
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function updateAdminPassword(id: string, newPassword: string): Promise<boolean> {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const result = await query(
    'UPDATE admins SET password = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
    [hashedPassword, id]
  );
  return result.rowCount! > 0;
}

export async function deleteAdmin(id: string): Promise<boolean> {
  const result = await query('DELETE FROM admins WHERE id = $1', [id]);
  return result.rowCount! > 0;
}

