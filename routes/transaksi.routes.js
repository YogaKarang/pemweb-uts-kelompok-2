const express = require('express');
const router = express.Router();
const transaksiController = require('../controllers/transaksi.controller');

router.get('/', transaksiController.index);
router.get('/qris', transaksiController.getByQris);
router.post('/store', transaksiController.store);
router.post('/update/:id', transaksiController.update);
router.post('/delete/:id', transaksiController.destroy);

module.exports = router;