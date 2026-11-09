const express = require('express');
const router = express.Router();
const c = require('../controllers/member.controller');

// Prefix '/member' sudah dipasang di routes/index.js,
// jadi di sini cukup path relatif (sama seperti transaksi.routes.js).
router.get('/', c.index);
router.get('/tambah', c.formTambah);
router.post('/tambah', c.simpan);
router.get('/edit/:id', c.formEdit);
router.post('/edit/:id', c.perbarui);
router.post('/hapus/:id', c.hapus);

module.exports = router;