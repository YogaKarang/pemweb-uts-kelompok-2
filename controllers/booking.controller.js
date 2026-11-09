const BookingModel = require('../models/booking.model');
const MemberModel = require('../models/member.model');

// READ: Menampilkan daftar booking
exports.index = async (req, res, next) => {
  try {
    const fnBookingAll = BookingModel.getAll || BookingModel.tampilSemua || BookingModel.tampilkanSemua || BookingModel.findAll;
    const fnMemberAll = MemberModel.getAll || MemberModel.tampilSemua || MemberModel.tampilkanSemua;

    const bookings = typeof fnBookingAll === 'function' ? await fnBookingAll.call(BookingModel) : [];
    const members = typeof fnMemberAll === 'function' ? await fnMemberAll.call(MemberModel) : [];

    res.render('pages/booking-list', {
      pageTitle: 'Booking Latihan',
      bookings: bookings || [],
      members: members || [],
      gagal: req.query.gagal === '1'
    });
  } catch (err) {
    next(err);
  }
};

// CREATE: Form tambah booking
exports.formTambah = async (req, res, next) => {
  try {
    const fnMemberAll = MemberModel.getAll || MemberModel.tampilSemua || MemberModel.tampilkanSemua;
    const members = typeof fnMemberAll === 'function' ? await fnMemberAll.call(MemberModel) : [];

    const booking = {
      id_member: '',
      jenis_latihan: '',
      tanggal_booking: new Date().toISOString().split('T')[0],
      jam_mulai: '',
      status: 'Dipesan',
      catatan: ''
    };

    res.render('pages/booking-form', {
      pageTitle: 'Tambah Booking Latihan',
      action: '/booking/tambah',
      booking,
      members: members || [],
      errors: []
    });
  } catch (err) {
    next(err);
  }
};

// CREATE: Simpan booking baru
exports.simpan = async (req, res, next) => {
  try {
    const fnCreate = BookingModel.create || BookingModel.tambah || BookingModel.store || BookingModel.simpan;
    await fnCreate.call(BookingModel, req.body);
    res.redirect('/booking');
  } catch (err) {
    next(err);
  }
};

// UPDATE: Form edit booking
exports.formEdit = async (req, res, next) => {
  try {
    const fnGetById = BookingModel.getById || BookingModel.getOne || BookingModel.findById;
    const booking = typeof fnGetById === 'function' ? await fnGetById.call(BookingModel, req.params.id) : null;
    if (!booking) return next();

    const fnMemberAll = MemberModel.getAll || MemberModel.tampilSemua || MemberModel.tampilkanSemua;
    const members = typeof fnMemberAll === 'function' ? await fnMemberAll.call(MemberModel) : [];

    res.render('pages/booking-form', {
      pageTitle: 'Edit Booking Latihan',
      action: `/booking/edit/${booking.id}`,
      booking,
      members: members || [],
      errors: []
    });
  } catch (err) {
    next(err);
  }
};

// UPDATE: Simpan perbaruan booking
exports.perbarui = async (req, res, next) => {
  try {
    const fnUpdate = BookingModel.update || BookingModel.edit || BookingModel.perbarui;
    await fnUpdate.call(BookingModel, req.params.id, req.body);
    res.redirect('/booking');
  } catch (err) {
    next(err);
  }
};

// DELETE: Hapus booking
exports.hapus = async (req, res, next) => {
  try {
    const fnDelete = BookingModel.delete || BookingModel.remove || BookingModel.hapus || BookingModel.destroy;
    await fnDelete.call(BookingModel, req.params.id);
    res.redirect('/booking');
  } catch (err) {
    next(err);
  }
};