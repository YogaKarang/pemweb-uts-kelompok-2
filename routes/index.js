const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home.controller');

router.get('/', homeController.getBeranda);

router.use('/member', require('./member.routes'));
router.use('/paket', require('./paket.routes'));
router.use('/transaksi', require('./transaksi.routes'));
router.use('/booking', require('./booking.routes'));

module.exports = router;