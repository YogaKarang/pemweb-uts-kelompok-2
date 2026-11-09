const express = require('express');
const BookingController = require('../controllers/booking.controller');

const router = express.Router();

router.get('/', BookingController.index);
router.get('/create', BookingController.createForm);
router.post('/', BookingController.store);
router.get('/:id/edit', BookingController.editForm);
router.post('/:id/update', BookingController.update);
router.post('/:id/delete', BookingController.destroy);

module.exports = router;