const db = require('../config/database');

const Paket = {
  async getAll() {
    const [rows] = await db.query(
      'SELECT * FROM paket_membership ORDER BY id DESC'
    );
    return rows;
  },

  async getById(id) {
    const [rows] = await db.query(
      'SELECT * FROM paket_membership WHERE id = ?',
      [id]
    );
    return rows[0];
  },

  async create({ nama_paket, durasi_hari, harga, deskripsi, status }) {
    const [result] = await db.query(
      `INSERT INTO paket_membership (nama_paket, durasi_hari, harga, deskripsi, status)
       VALUES (?, ?, ?, ?, ?)`,
      [nama_paket, durasi_hari, harga, deskripsi, status]
    );
    return result.insertId;
  },

  async update(id, { nama_paket, durasi_hari, harga, deskripsi, status }) {
    const [result] = await db.query(
      `UPDATE paket_membership
       SET nama_paket = ?, durasi_hari = ?, harga = ?, deskripsi = ?, status = ?
       WHERE id = ?`,
      [nama_paket, durasi_hari, harga, deskripsi, status, id]
    );
    return result.affectedRows;
  },

  async delete(id) {
    const [result] = await db.query(
      'DELETE FROM paket_membership WHERE id = ?',
      [id]
    );
    return result.affectedRows;
  },
};

module.exports = Paket;