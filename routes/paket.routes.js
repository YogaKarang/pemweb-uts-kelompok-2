const express = require('express');
const router = express.Router();
const c = require('../controllers/paket.controller');

router.get('/paket', c.index);
router.get('/paket/tambah', c.formTambah);
router.post('/paket/tambah', c.tambah);
router.get('/paket/edit/:id', c.formEdit);
router.post('/paket/edit/:id', c.edit);
router.post('/paket/hapus/:id', c.hapus);

module.exports = router;