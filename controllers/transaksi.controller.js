const TransaksiModel = require('../models/transaksi.model');
const MemberModel = require('../models/member.model');

exports.index = async (req, res) => {
    try {
        const transaksis = await TransaksiModel.getAll();
        const members = await MemberModel.getAll();
        const pakets = []; 

        res.render('pages/transaksi', { 
            transaksis, 
            members, 
            pakets, 
            pageTitle: 'Transaksi' 
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Terjadi kesalahan pada server");
    }
};

exports.store = async (req, res) => {
    try {
        await TransaksiModel.create(req.body);
        res.redirect('/transaksi');
    } catch (err) {
        console.error(err);
        res.status(500).send("Gagal menyimpan data transaksi");
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

exports.getByQris = async (req, res) => {
    try {
        const transaksis = await TransaksiModel.getByMetodeBayar('QRIS');
        const members = await MemberModel.getAll();
        const pakets = [];

        res.render('pages/transaksi', { 
            transaksis, 
            members, 
            pakets, 
            pageTitle: 'Transaksi QRIS' 
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Terjadi kesalahan pada server");
    }
};