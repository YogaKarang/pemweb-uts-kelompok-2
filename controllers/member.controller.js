const Member = require('../models/member.model');

// Validasi sederhana di server
const cek = (b) => {
  const errors = [];
  if (!b.nama || !b.nama.trim()) errors.push('Nama wajib diisi.');
  if (!/^\d{10,13}$/.test(b.no_hp || '')) errors.push('No. HP harus angka 10-13 digit.');
  if (!['Laki-laki', 'Perempuan'].includes(b.jenis_kelamin)) errors.push('Jenis kelamin wajib dipilih.');
  if (!b.tanggal_lahir) errors.push('Tanggal lahir wajib diisi.');
  if (!['Aktif', 'Nonaktif'].includes(b.status)) errors.push('Status wajib dipilih.');
  return errors;
};

// READ: daftar member
exports.index = async (req, res) => {
  const members = await Member.getAll();
  res.render('pages/member-list', { pageTitle: 'Data Member', members, gagal: req.query.gagal === '1' });
};

// CREATE: tampilkan form
exports.formTambah = (req, res) => {
  const kosong = { nama: '', no_hp: '', email: '', jenis_kelamin: '', tanggal_lahir: '', status: 'Aktif' };
  res.render('pages/member-form', { pageTitle: 'Tambah Member', action: '/member/tambah', member: kosong, errors: [] });
};

// CREATE: simpan
exports.simpan = async (req, res) => {
  const body = req.body || {};
  const errors = cek(body);
  if (errors.length > 0) {
    return res.status(400).render('pages/member-form', { pageTitle: 'Tambah Member', action: '/member/tambah', member: body, errors });
  }
  await Member.create(body);
  res.redirect('/member'); // PRG
};

// UPDATE: tampilkan form terisi data lama
exports.formEdit = async (req, res, next) => {
  const member = await Member.getById(req.params.id);
  if (!member) return next(); // tidak ketemu -> 404
  res.render('pages/member-form', { pageTitle: 'Edit Member', action: `/member/edit/${member.id}`, member, errors: [] });
};

// UPDATE: simpan perubahan
exports.perbarui = async (req, res, next) => {
  const id = req.params.id;
  if (!(await Member.getById(id))) return next();

  const body = req.body || {};
  const errors = cek(body);
  if (errors.length > 0) {
    return res.status(400).render('pages/member-form', { pageTitle: 'Edit Member', action: `/member/edit/${id}`, member: body, errors });
  }
  await Member.update(id, body);
  res.redirect('/member'); // PRG
};

// DELETE
exports.hapus = async (req, res, next) => {
  try {
    const terhapus = await Member.remove(req.params.id);
    if (!terhapus) return next();
  } catch (err) {
    // member masih dipakai di tabel transaksi/booking (foreign key)
    if (err.code === 'ER_ROW_IS_REFERENCED_2') return res.redirect('/member?gagal=1');
    throw err;
  }
  res.redirect('/member'); // PRG
};