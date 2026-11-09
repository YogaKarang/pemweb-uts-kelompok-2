// controllers/booking.controller.js
const BookingModel = require('../models/booking.model');

// Harus sama persis dengan ENUM pada database.sql
const JENIS_LATIHAN = ['Gym Bebas', 'Kelas Yoga', 'Zumba', 'Personal Trainer'];
const STATUS_BOOKING = ['Dipesan', 'Selesai', 'Dibatalkan'];

const INFO_MESSAGES = {
  created: 'Booking latihan berhasil ditambahkan.',
  updated: 'Booking latihan berhasil diperbarui.',
  deleted: 'Booking latihan berhasil dihapus.',
};

const BULAN = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli',
               'Agustus', 'September', 'Oktober', 'November', 'Desember'];

function formatTanggal(iso) {
  if (!iso) return '-';
  const [y, m, d] = iso.split('-');
  return `${parseInt(d, 10)} ${BULAN[parseInt(m, 10) - 1]} ${y}`;
}

function parseId(value) {
  return /^\d+$/.test(String(value)) ? Number(value) : null;
}

function notFound(next) {
  const err = new Error('Data booking tidak ditemukan.');
  err.status = 404;
  return next(err);
}

function isValidDate(str) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(str)) return false;
  const d = new Date(`${str}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === str;
}

async function validateInput(body, currentMemberId = 0) {
  const data = {
    id_member: parseId(String(body.id_member || '').trim()),
    jenis_latihan: String(body.jenis_latihan || '').trim(),
    tanggal_booking: String(body.tanggal_booking || '').trim(),
    jam_mulai: String(body.jam_mulai || '').trim(),
    status: String(body.status || 'Dipesan').trim(),
    catatan: String(body.catatan || '').trim(),
  };
  const errors = [];

  if (!data.id_member || !(await BookingModel.memberAllowed(data.id_member, currentMemberId))) {
    errors.push('Member wajib dipilih dan harus berstatus Aktif.');
  }
  if (!JENIS_LATIHAN.includes(data.jenis_latihan)) {
    errors.push('Jenis latihan tidak valid.');
  }
  if (!isValidDate(data.tanggal_booking)) {
    errors.push('Tanggal booking tidak valid.');
  }
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(data.jam_mulai)) {
    errors.push('Jam mulai tidak valid (format HH:MM).');
  }
  if (!STATUS_BOOKING.includes(data.status)) {
    errors.push('Status booking tidak valid.');
  }
  if (data.catatan.length > 500) {
    errors.push('Catatan maksimal 500 karakter.');
  }
  data.catatan = data.catatan || null;
  return { data, errors };
}

async function renderForm(res, { status = 200, mode, booking, errors = [], currentMemberId = 0 }) {
  const members = await BookingModel.getMemberOptions(currentMemberId);
  return res.status(status).render('pages/booking/form', {
    pageTitle: mode === 'edit' ? 'Edit Booking Latihan' : 'Tambah Booking Latihan', // Ditentukan sebagai pageTitle
    mode,
    booking,
    errors,
    members,
    jenisLatihan: JENIS_LATIHAN,
    statusBooking: STATUS_BOOKING,
  });
}

const BookingController = {
  // READ
  async index(req, res, next) {
    try {
      const rows = await BookingModel.findAll();
      const bookings = rows.map((b) => ({ ...b, tanggal_tampil: formatTanggal(b.tanggal_iso) }));
      res.render('pages/booking/index', {
        pageTitle: 'Booking Latihan', // Ditentukan sebagai pageTitle
        bookings,
        info: INFO_MESSAGES[req.query.info] || null,
      });
    } catch (err) { next(err); }
  },

  // CREATE (form)
  async createForm(req, res, next) {
    try {
      await renderForm(res, {
        mode: 'create',
        booking: { id_member: '', jenis_latihan: '', tanggal_booking: '',
                   jam_mulai: '', status: 'Dipesan', catatan: '' },
      });
    } catch (err) { next(err); }
  },

  // CREATE (proses) + PRG
  async store(req, res, next) {
    try {
      const { data, errors } = await validateInput(req.body);
      if (errors.length) {
        return renderForm(res, { status: 422, mode: 'create', booking: data, errors });
      }
      await BookingModel.create(data);
      res.redirect('/booking?info=created');
    } catch (err) { next(err); }
  },

  // UPDATE (form)
  async editForm(req, res, next) {
    try {
      const id = parseId(req.params.id);
      const row = id && (await BookingModel.findById(id));
      if (!row) return notFound(next);
      await renderForm(res, {
        mode: 'edit',
        booking: { ...row, tanggal_booking: row.tanggal_iso },
        currentMemberId: row.id_member,
      });
    } catch (err) { next(err); }
  },

  // UPDATE (proses) + PRG
  async update(req, res, next) {
    try {
      const id = parseId(req.params.id);
      const existing = id && (await BookingModel.findById(id));
      if (!existing) return notFound(next);

      const { data, errors } = await validateInput(req.body, existing.id_member);
      if (errors.length) {
        return renderForm(res, {
          status: 422, mode: 'edit', booking: { ...data, id },
          errors, currentMemberId: existing.id_member,
        });
      }
      await BookingModel.update(id, data);
      res.redirect('/booking?info=updated');
    } catch (err) { next(err); }
  },

  // DELETE
  async destroy(req, res, next) {
    try {
      const id = parseId(req.params.id);
      if (!id) return notFound(next);
      const affected = await BookingModel.remove(id);
      if (!affected) return notFound(next);
      res.redirect('/booking?info=deleted');
    } catch (err) { next(err); }
  },
};

module.exports = BookingController;