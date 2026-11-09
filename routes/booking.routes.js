const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');

router.get('/', bookingController.index);
router.get('/tambah', bookingController.formTambah);
router.post('/tambah', bookingController.simpan);
router.get('/edit/:id', bookingController.formEdit);
router.post('/edit/:id', bookingController.perbarui);
router.post('/hapus/:id', bookingController.hapus);

module.exports = router;