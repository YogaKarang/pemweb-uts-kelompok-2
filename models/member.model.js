const db = require('../config/database');

exports.getAll = async () => {
  const [rows] = await db.execute(
    'SELECT id, nama, no_hp, email, jenis_kelamin, tanggal_lahir, status FROM member ORDER BY id DESC'
  );
  return rows;
};

exports.getById = async (id) => {
  const [rows] = await db.execute(
    'SELECT id, nama, no_hp, email, jenis_kelamin, tanggal_lahir, status FROM member WHERE id = ?',
    [id]
  );
  return rows[0];
};

exports.create = async (d) => {
  await db.execute(
    'INSERT INTO member (nama, no_hp, email, jenis_kelamin, tanggal_lahir, status) VALUES (?, ?, ?, ?, ?, ?)',
    [d.nama, d.no_hp, d.email || null, d.jenis_kelamin, d.tanggal_lahir, d.status]
  );
};

exports.update = async (id, d) => {
  await db.execute(
    'UPDATE member SET nama = ?, no_hp = ?, email = ?, jenis_kelamin = ?, tanggal_lahir = ?, status = ? WHERE id = ?',
    [d.nama, d.no_hp, d.email || null, d.jenis_kelamin, d.tanggal_lahir, d.status, id]
  );
};

exports.remove = async (id) => {
  const [result] = await db.execute('DELETE FROM member WHERE id = ?', [id]);
  return result.affectedRows;
};