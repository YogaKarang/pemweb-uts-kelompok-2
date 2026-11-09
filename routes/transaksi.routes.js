const express = require('express');
const router = express.Router();

// TODO (Dika): ganti rute sementara di bawah ini dengan rute CRUD modul Transaksi
// (pola: lihat bagian "Cara Mengerjakan Modul" di README.md).
router.get('/transaksi', (req, res) => {
  res.render('pages/placeholder', { pageTitle: 'Transaksi', modul: 'Transaksi', pemegang: 'Dika' });
});

module.exports = router;
