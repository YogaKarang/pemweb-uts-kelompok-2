const express = require('express');
const router = express.Router();
const transaksiController = require('../controllers/transaksi.controller');

router.get('/transaksi', transaksiController.index);
router.get('/transaksi/create', transaksiController.renderCreate);
router.post('/transaksi', transaksiController.store);
router.get('/transaksi/edit/:id', transaksiController.renderUpdate);
router.post('/transaksi/update/:id', transaksiController.update);
router.post('/transaksi/delete/:id', transaksiController.destroy);

module.exports = router;