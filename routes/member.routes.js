const express = require('express');
const router = express.Router();
const c = require('../controllers/member.controller');

router.get('/member', c.index);
router.get('/member/tambah', c.formTambah);
router.post('/member/tambah', c.simpan);
router.get('/member/edit/:id', c.formEdit);
router.post('/member/edit/:id', c.perbarui);
router.post('/member/hapus/:id', c.hapus);

module.exports = router;