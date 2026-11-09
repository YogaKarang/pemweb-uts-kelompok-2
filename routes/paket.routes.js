const express = require('express');
const router = express.Router();
const c = require('../controllers/paket.controller');

router.get('/', c.index);
router.get('/tambah', c.formTambah);
router.post('/tambah', c.tambah);
router.get('/edit/:id', c.formEdit);
router.post('/edit/:id', c.edit);
router.post('/hapus/:id', c.hapus);

module.exports = router;