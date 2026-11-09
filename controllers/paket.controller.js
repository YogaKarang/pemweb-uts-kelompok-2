const Paket = require('../models/paket.model');

const STATUS_VALID = ['Aktif', 'Nonaktif'];

// Validasi input sisi server. Mengembalikan { data, errors }
function validasi(body) {
  const data = {
    nama_paket: (body.nama_paket || '').trim(),
    durasi_hari: body.durasi_hari,
    harga: body.harga,
    deskripsi: (body.deskripsi || '').trim() || null,
    status: body.status,
  };
  const errors = [];

  if (!data.nama_paket) errors.push('Nama paket wajib diisi.');
  else if (data.nama_paket.length > 100) errors.push('Nama paket maksimal 100 karakter.');

  const durasi = Number(data.durasi_hari);
  if (!Number.isInteger(durasi) || durasi < 1) {
    errors.push('Durasi harus berupa bilangan bulat minimal 1 hari.');
  }

  const harga = Number(data.harga);
  if (data.harga === '' || data.harga === undefined || Number.isNaN(harga) || harga < 0) {
    errors.push('Harga harus berupa angka dan tidak boleh negatif.');
  } else if (harga > 99999999.99) {
    errors.push('Harga terlalu besar.');
  }

  if (!STATUS_VALID.includes(data.status)) errors.push('Status tidak valid.');

  return { data, errors };
}

// READ (All)
exports.index = async (req, res, next) => {
  try {
    const pakets = await Paket.getAll();
    res.render('pages/paket-list', {
      pageTitle: 'Paket Membership',
      pakets: pakets || [],
      pesanError: null,
    });
  } catch (err) {
    next(err);
  }
};

// Form tambah
exports.formTambah = (req, res) => {
  res.render('pages/paket-form', {
    pageTitle: 'Tambah Paket',
    mode: 'tambah',
    action: '/paket/tambah',
    paket: { nama_paket: '', durasi_hari: '', harga: '', deskripsi: '', status: 'Aktif' },
    errors: [],
  });
};

// CREATE
exports.tambah = async (req, res, next) => {
  try {
    const { data, errors } = validasi(req.body);
    if (errors.length) {
      return res.status(400).render('pages/paket-form', {
        pageTitle: 'Tambah Paket',
        mode: 'tambah',
        action: '/paket/tambah',
        paket: { ...req.body },
        errors,
      });
    }
    await Paket.create(data);
    res.redirect('/paket');
  } catch (err) {
    next(err);
  }
};

// Form edit (pre-filled)
exports.formEdit = async (req, res, next) => {
  try {
    const paket = await Paket.getById(req.params.id);
    if (!paket) return next(); // lanjut ke handler 404
    res.render('pages/paket-form', {
      pageTitle: 'Edit Paket',
      mode: 'edit',
      action: `/paket/edit/${paket.id}`,
      paket,
      errors: [],
    });
  } catch (err) {
    next(err);
  }
};

// UPDATE
exports.edit = async (req, res, next) => {
  try {
    const id = req.params.id;
    const ada = await Paket.getById(id);
    if (!ada) return next();

    const { data, errors } = validasi(req.body);
    if (errors.length) {
      return res.status(400).render('pages/paket-form', {
        pageTitle: 'Edit Paket',
        mode: 'edit',
        action: `/paket/edit/${id}`,
        paket: { ...req.body, id },
        errors,
      });
    }
    await Paket.update(id, data);
    res.redirect('/paket');
  } catch (err) {
    next(err);
  }
};

// DELETE
exports.hapus = async (req, res, next) => {
  try {
    // Menyesuaikan jika method di model kamu bernama delete atau remove
    const fnDelete = Paket.delete || Paket.remove;
    const affected = await fnDelete.call(Paket, req.params.id);
    
    if (!affected) return next(); // data tidak ditemukan -> 404
    res.redirect('/paket');
  } catch (err) {
    if (err.code === 'ER_ROW_IS_REFERENCED_2') {
      // Paket masih dipakai tabel transaksi
      try {
        const pakets = await Paket.getAll();
        return res.status(409).render('pages/paket-list', {
          pageTitle: 'Paket Membership',
          pakets: pakets || [],
          pesanError:
            'Paket tidak dapat dihapus karena masih dipakai pada data transaksi. ' +
            'Ubah statusnya menjadi Nonaktif jika paket tidak dijual lagi.',
        });
      } catch (e) {
        return next(e);
      }
    }
    next(err);
  }
};