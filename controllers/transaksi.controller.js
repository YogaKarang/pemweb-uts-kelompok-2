const TransaksiModel = require('../models/transaksi.model');

exports.index = async (req, res) => {
    try {
        const transaksis = await TransaksiModel.getAll();
        res.render('pages/transaksi/index', { transaksis, pageTitle: 'Transaksi' });
    } catch (err) {
        console.error(err);
        res.status(500).send("Terjadi kesalahan pada server");
    }
};

exports.renderCreate = (req, res) => {
    res.render('pages/transaksi/create', { pageTitle: 'Tambah Transaksi' });
};

exports.store = async (req, res) => {
    try {
        await TransaksiModel.create(req.body);
        res.redirect('/transaksi');
    } catch (err) {
        console.error(err);
        res.status(500).send("Gagal menyimpan data");
    }
};

exports.renderUpdate = async (req, res) => {
    try {
        const transaksi = await TransaksiModel.getById(req.params.id);
        res.render('pages/transaksi/edit', { transaksi, pageTitle: 'Edit Transaksi' });
    } catch (err) {
        console.error(err);
        res.status(500).send("Data tidak ditemukan");
    }
};

exports.update = async (req, res) => {
    try {
        await TransaksiModel.update(req.params.id, req.body);
        res.redirect('/transaksi');
    } catch (err) {
        console.error(err);
        res.status(500).send("Gagal memperbarui data");
    }
};

exports.destroy = async (req, res) => {
    try {
        await TransaksiModel.delete(req.params.id);
        res.redirect('/transaksi');
    } catch (err) {
        console.error(err);
        res.status(500).send("Gagal menghapus data");
    }
};