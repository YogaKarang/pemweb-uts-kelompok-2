const express = require('express');
const router = express.Router();
const transaksiController = require('../controllers/transaksi.controller');

router.get('/', transaksiController.index);
router.get('/qris', transaksiController.getByQris);
router.get('/tambah', transaksiController.formTambah);
router.post('/store', transaksiController.store);
router.get('/edit/:id', transaksiController.formEdit);
router.post('/update/:id', transaksiController.update);
router.post('/destroy/:id', transaksiController.destroy);

module.exports = router;