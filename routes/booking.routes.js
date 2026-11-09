const express = require('express');
const router = express.Router();

// TODO (Dede): ganti rute sementara di bawah ini dengan rute CRUD modul Booking Latihan
// (pola: lihat bagian "Cara Mengerjakan Modul" di README.md).
router.get('/booking', (req, res) => {
  res.render('pages/placeholder', { pageTitle: 'Booking Latihan', modul: 'Booking Latihan', pemegang: 'Dede' });
});

module.exports = router;
