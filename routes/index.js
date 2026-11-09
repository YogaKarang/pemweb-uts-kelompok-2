const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home.controller');

router.get('/', homeController.getBeranda);

router.use('/', require('./member.routes'));
router.use('/', require('./paket.routes'));
router.use('/', require('./transaksi.routes'));
router.use('/', require('./booking.routes'));

module.exports = router;