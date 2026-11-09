// routes/index.js
const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/home.controller');

// Rute Beranda (Root)
router.get('/', HomeController.index);

// Rute Modul-Modul Utama
router.use('/member', require('./member.routes'));
router.use('/paket', require('./paket.routes'));
router.use('/transaksi', require('./transaksi.routes'));
router.use('/booking', require('./booking.routes'));

module.exports = router;