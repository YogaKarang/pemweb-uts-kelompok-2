// routes/booking.routes.js  (milik Dede)
// Dipasang pada '/', jadi awalan /booking ditulis di setiap rute.
const express = require('express');
const BookingController = require('../controllers/booking.controller');

const router = express.Router();

router.get('/booking', BookingController.index);                 // Read
router.get('/booking/create', BookingController.createForm);     // Create (form)
router.post('/booking', BookingController.store);                // Create (proses, PRG)
router.get('/booking/:id/edit', BookingController.editForm);     // Update (form pre-filled)
router.post('/booking/:id/update', BookingController.update);    // Update (proses, PRG)
router.post('/booking/:id/delete', BookingController.destroy);   // Delete (proses, PRG)

module.exports = router;