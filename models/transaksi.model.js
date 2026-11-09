const db = require('../config/database');

class TransaksiModel {
    static async getAll() {
        const [rows] = await db.execute("SELECT * FROM transaksi ORDER BY id DESC");
        return rows;
    }

    static async getByMetodeBayar(metode) {
        const [rows] = await db.execute("SELECT * FROM transaksi WHERE metode_bayar = ? ORDER BY id DESC", [metode]);
        return rows;
    }

    static async create(data) {
        const query = "INSERT INTO transaksi (id_member, id_paket, tanggal_transaksi, metode_bayar, status_bayar, total_bayar) VALUES (?, ?, ?, ?, ?, ?)";
        
        const values = [
            data.id_member || null,
            data.id_paket || null,
            data.tanggal_transaksi || null,
            data.metode_bayar || null,
            data.status_bayar || null,
            data.total_bayar || null
        ];

        const [result] = await db.execute(query, values);
        return result;
    }

    static async update(id, data) {
        const query = "UPDATE transaksi SET id_member = ?, id_paket = ?, tanggal_transaksi = ?, metode_bayar = ?, status_bayar = ?, total_bayar = ? WHERE id = ?";
        const values = [
            data.id_member || null,
            data.id_paket || null,
            data.tanggal_transaksi || null,
            data.metode_bayar || null,
            data.status_bayar || null,
            data.total_bayar || null,
            id
        ];
        const [result] = await db.execute(query, values);
        return result;
    }

    static async delete(id) {
        const [result] = await db.execute("DELETE FROM transaksi WHERE id = ?", [id]);
        return result;
    }
}

module.exports = TransaksiModel;