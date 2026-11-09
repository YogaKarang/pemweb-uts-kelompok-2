const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home.controller');

router.get('/', homeController.getBeranda);

// Setiap modul memiliki berkas rutenya sendiri. Semua sudah didaftarkan di sini,
// sehingga anggota CUKUP mengedit berkas rute modulnya (tidak perlu menyentuh berkas ini).
router.use('/', require('./member.routes'));
router.use('/', require('./paket.routes'));
router.use('/', require('./transaksi.routes'));
router.use('/', require('./booking.routes'));

module.exports = router;
