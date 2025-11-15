import { query } from '../database/config.js';
import { v4 as uuidv4 } from 'uuid';

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  status: 'pending' | 'replied' | 'resolved';
  created_at: Date;
  updated_at: Date;
}

export async function getAllContacts(limit = 20, offset = 0): Promise<Contact[]> {
  const result = await query(
    'SELECT * FROM contacts ORDER BY created_at DESC LIMIT $1 OFFSET $2',
    [limit, offset]
  );
  return result.rows;
}

export async function getContactById(id: string): Promise<Contact | null> {
  const result = await query('SELECT * FROM contacts WHERE id = $1', [id]);
  return result.rows[0] || null;
}

export async function createContact(data: Omit<Contact, 'id' | 'status' | 'created_at' | 'updated_at'>): Promise<Contact> {
  const id = uuidv4();
  const result = await query(
    `INSERT INTO contacts (id, name, email, phone, company, subject, message)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [id, data.name, data.email, data.phone, data.company, data.subject, data.message]
  );
  return result.rows[0];
}

export async function updateContactStatus(id: string, status: Contact['status']): Promise<Contact | null> {
  const result = await query(
    'UPDATE contacts SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
    [status, id]
  );
  return result.rows[0] || null;
}

export async function deleteContact(id: string): Promise<boolean> {
  const result = await query('DELETE FROM contacts WHERE id = $1', [id]);
  return result.rowCount! > 0;
}

export async function getContactsByStatus(status: Contact['status']): Promise<Contact[]> {
  const result = await query(
    'SELECT * FROM contacts WHERE status = $1 ORDER BY created_at DESC',
    [status]
  );
  return result.rows;
}

