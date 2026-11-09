
const Member = require('../models/member.model');

// Validasi data member
const cek = (b) => {
  const errors = [];

  if (!b.nama || !b.nama.trim()) {
    errors.push('Nama wajib diisi.');
  }

  if (!/^\d{10,13}$/.test(b.no_hp || '')) {
    errors.push('No HP harus 10-13 angka.');
  }

  if (!['Laki-laki', 'Perempuan'].includes(b.jenis_kelamin)) {
    errors.push('Jenis kelamin wajib dipilih.');
  }

  if (!b.tanggal_lahir) {
    errors.push('Tanggal lahir wajib diisi.');
  }

  if (!['Aktif', 'Nonaktif'].includes(b.status)) {
    errors.push('Status wajib dipilih.');
  }

  return errors;
};

// READ: Menampilkan semua member
exports.index = async (req, res) => {
  const members = await Member.getAll();

  res.render('pages/member-list', {
    pageTitle: 'Data Member',
    members,
    gagal: req.query.gagal === '1'
  });
};

// CREATE: Menampilkan form tambah
exports.formTambah = (req, res) => {
  const member = {
    nama: '',
    no_hp: '',
    email: '',
    jenis_kelamin: '',
    tanggal_lahir: '',
    status: 'Aktif'
  };

  res.render('pages/member-form', {
    pageTitle: 'Tambah Member',
    action: '/member/tambah',
    member,
    errors: []
  });
};

// CREATE: Menyimpan member baru
exports.simpan = async (req, res) => {
  const body = req.body;
  const errors = cek(body);

  if (errors.length > 0) {
    return res.status(400).render('pages/member-form', {
      pageTitle: 'Tambah Member',
      action: '/member/tambah',
      member: body,
      errors
    });
  }

  await Member.create(body);
  res.redirect('/member');
};

// UPDATE: Menampilkan data yang ingin diedit
exports.formEdit = async (req, res, next) => {
  const member = await Member.getById(req.params.id);

  if (!member) return next();

  res.render('pages/member-form', {
    pageTitle: 'Edit Member',
    action: `/member/edit/${member.id}`,
    member,
    errors: []
  });
};

// UPDATE: Menyimpan perubahan member
exports.perbarui = async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;

  const member = await Member.getById(id);
  if (!member) return next();

  const errors = cek(body);

  if (errors.length > 0) {
    return res.status(400).render('pages/member-form', {
      pageTitle: 'Edit Member',
      action: `/member/edit/${id}`,
      member: body,
      errors
    });
  }

  await Member.update(id, body);
  res.redirect('/member');
};

// DELETE: Menghapus member
exports.hapus = async (req, res, next) => {
  try {
    const hasil = await Member.remove(req.params.id);

    if (!hasil) return next();

    res.redirect('/member');

  } catch (err) {
    if (err.code === 'ER_ROW_IS_REFERENCED_2') {
      return res.redirect('/member?gagal=1');
    }

    throw err;
  }
};