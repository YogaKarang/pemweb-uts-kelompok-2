const express = require('express');
const router = express.Router();

// TODO (Gusin): ganti rute sementara di bawah ini dengan rute CRUD modul Data Member
// (pola: lihat bagian "Cara Mengerjakan Modul" di README.md).
router.get('/member', (req, res) => {
  res.render('pages/placeholder', { pageTitle: 'Data Member', modul: 'Data Member', pemegang: 'Gusin' });
});

module.exports = router;
