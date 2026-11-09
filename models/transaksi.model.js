const db = require('../config/database'); // Sesuaikan dengan koneksi database kelompok kalian

class TransaksiModel {
    static async getAll() {
        const [rows] = await db.execute('SELECT * FROM transaksi ORDER BY id DESC');
        return rows;
    }

    static async getById(id) {
        const [rows] = await db.execute('SELECT * FROM transaksi WHERE id = ?', [id]);
        return rows[0];
    }

    static async create(data) {
        const { member_name, package_name, amount, payment_method, status } = data;
        const query = 'INSERT INTO transaksi (member_name, package_name, amount, payment_method, status) VALUES (?, ?, ?, ?, ?)';
        const [result] = await db.execute(query, [member_name, package_name, amount, payment_method, status]);
        return result;
    }

    static async update(id, data) {
        const { member_name, package_name, amount, payment_method, status } = data;
        const query = 'UPDATE transaksi SET member_name = ?, package_name = ?, amount = ?, payment_method = ?, status = ? WHERE id = ?';
        const [result] = await db.execute(query, [member_name, package_name, amount, payment_method, status, id]);
        return result;
    }

    static async delete(id) {
        const [result] = await db.execute('DELETE FROM transaksi WHERE id = ?', [id]);
        return result;
    }
}

module.exports = TransaksiModel;