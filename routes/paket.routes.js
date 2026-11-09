const express = require('express');
const router = express.Router();

// TODO (Mathew): ganti rute sementara di bawah ini dengan rute CRUD modul Paket Membership
// (pola: lihat bagian "Cara Mengerjakan Modul" di README.md).
router.get('/paket', (req, res) => {
  res.render('pages/placeholder', { pageTitle: 'Paket Membership', modul: 'Paket Membership', pemegang: 'Mathew' });
});

module.exports = router;
