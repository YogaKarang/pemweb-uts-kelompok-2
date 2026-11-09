const TransaksiModel = require('../models/transaksi.model');
const MemberModel = require('../models/member.model');
const PaketModel = require('../models/paket.model');

// READ: Menampilkan daftar transaksi
exports.index = async (req, res, next) => {
  try {
    const transaksis = await TransaksiModel.getAll();
    const members = await MemberModel.getAll();
    const pakets = await PaketModel.getAll();

    res.render('pages/transaksi-list', {
      pageTitle: 'Daftar Transaksi Gym',
      transaksis: transaksis || [],
      members: members || [],
      pakets: pakets || []
    });
  } catch (err) {
    next(err);
  }
};

// READ: Filter transaksi QRIS
exports.getByQris = async (req, res, next) => {
  try {
    const fnFilter = TransaksiModel.getByMetodeBayar || TransaksiModel.getByMetode || TransaksiModel.getAll;
    const transaksis = await fnFilter.call(TransaksiModel, 'QRIS');

    const members = await MemberModel.getAll();
    const pakets = await PaketModel.getAll();

    res.render('pages/transaksi-list', {
      pageTitle: 'Transaksi QRIS',
      transaksis: transaksis || [],
      members: members || [],
      pakets: pakets || []
    });
  } catch (err) {
    next(err);
  }
};

// CREATE: Menampilkan form tambah transaksi
exports.formTambah = async (req, res, next) => {
  try {
    const members = await MemberModel.getAll();
    const pakets = await PaketModel.getAll();

    const transaksi = {
      id_member: '',
      id_paket: '',
      tanggal_transaksi: new Date().toISOString().split('T')[0],
      metode_bayar: 'Tunai',
      status_bayar: 'Lunas',
      total_bayar: ''
    };

    res.render('pages/transaksi-form', {
      pageTitle: 'Tambah Transaksi',
      action: '/transaksi/store',
      transaksi,
      members: members || [],
      pakets: pakets || [],
      errors: []
    });
  } catch (err) {
    next(err);
  }
};

// CREATE: Menyimpan data transaksi baru
exports.store = async (req, res, next) => {
  try {
    await TransaksiModel.create(req.body);
    res.redirect('/transaksi');
  } catch (err) {
    next(err);
  }
};

// UPDATE: Menampilkan form edit transaksi
exports.formEdit = async (req, res, next) => {
  try {
    const transaksi = await TransaksiModel.getById(req.params.id);
    if (!transaksi) return next();

    const members = await MemberModel.getAll();
    const pakets = await PaketModel.getAll();

    res.render('pages/transaksi-form', {
      pageTitle: `Edit Transaksi #${transaksi.id}`,
      action: `/transaksi/update/${transaksi.id}`,
      transaksi,
      members: members || [],
      pakets: pakets || [],
      errors: []
    });
  } catch (err) {
    next(err);
  }
};

// UPDATE: Menyimpan perubahan transaksi
exports.update = async (req, res, next) => {
  try {
    await TransaksiModel.update(req.params.id, req.body);
    res.redirect('/transaksi');
  } catch (err) {
    next(err);
  }
};

// DELETE: Menghapus data transaksi
exports.destroy = async (req, res, next) => {
  try {
    const fnDelete = TransaksiModel.delete || TransaksiModel.remove || TransaksiModel.destroy;
    await fnDelete.call(TransaksiModel, req.params.id);
    res.redirect('/transaksi');
  } catch (err) {
    next(err);
  }
};