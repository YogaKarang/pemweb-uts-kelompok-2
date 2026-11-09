const express = require('express');
const router = express.Router();
const c = require('../controllers/member.controller');

router.get('/', c.index);
router.get('/tambah', c.formTambah);
router.post('/tambah', c.simpan);
router.get('/edit/:id', c.formEdit);
router.post('/edit/:id', c.perbarui);
router.post('/hapus/:id', c.hapus);

module.exports = router;