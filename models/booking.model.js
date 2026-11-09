// models/booking.model.js
// Seluruh query SQL modul Booking Latihan (Prepared Statement: tanda ?)
const pool = require('../config/database'); // mysql2/promise Pool

const SELECT_BOOKING = `
  SELECT b.id, b.id_member, m.nama AS nama_member,
         b.jenis_latihan,
         DATE_FORMAT(b.tanggal_booking, '%Y-%m-%d') AS tanggal_iso,
         TIME_FORMAT(b.jam_mulai, '%H:%i') AS jam_mulai,
         b.status, b.catatan
  FROM booking_latihan b
  JOIN member m ON m.id = b.id_member
`;

const BookingModel = {
  async findAll() {
    const [rows] = await pool.query(
      `${SELECT_BOOKING} ORDER BY b.tanggal_booking DESC, b.jam_mulai ASC`
    );
    return rows;
  },

  async findById(id) {
    const [rows] = await pool.execute(`${SELECT_BOOKING} WHERE b.id = ?`, [id]);
    return rows[0] || null;
  },

  async create({ id_member, jenis_latihan, tanggal_booking, jam_mulai, status, catatan }) {
    const [result] = await pool.execute(
      `INSERT INTO booking_latihan
         (id_member, jenis_latihan, tanggal_booking, jam_mulai, status, catatan)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id_member, jenis_latihan, tanggal_booking, jam_mulai, status, catatan]
    );
    return result.insertId;
  },

  async update(id, { id_member, jenis_latihan, tanggal_booking, jam_mulai, status, catatan }) {
    const [result] = await pool.execute(
      `UPDATE booking_latihan
          SET id_member = ?, jenis_latihan = ?, tanggal_booking = ?,
              jam_mulai = ?, status = ?, catatan = ?
        WHERE id = ?`,
      [id_member, jenis_latihan, tanggal_booking, jam_mulai, status, catatan, id]
    );
    return result.affectedRows;
  },

  async remove(id) {
    const [result] = await pool.execute('DELETE FROM booking_latihan WHERE id = ?', [id]);
    return result.affectedRows;
  },

  // Dropdown member: hanya yang Aktif, plus member yang sedang terpasang di booking
  async getMemberOptions(currentMemberId = 0) {
    const [rows] = await pool.execute(
      `SELECT id, nama FROM member
        WHERE status = 'Aktif' OR id = ?
        ORDER BY nama ASC`,
      [currentMemberId]
    );
    return rows;
  },

  async memberAllowed(id, currentMemberId = 0) {
    const [rows] = await pool.execute(
      `SELECT 1 FROM member WHERE id = ? AND (status = 'Aktif' OR id = ?)`,
      [id, currentMemberId]
    );
    return rows.length > 0;
  },
};

module.exports = BookingModel;