// routes/index.js
const express = require('express');
const router = express.Router();

router.use('/member', require('./member.routes'));
router.use('/paket', require('./paket.routes'));
router.use('/transaksi', require('./transaksi.routes'));
router.use('/booking', require('./booking.routes'));

module.exports = router;