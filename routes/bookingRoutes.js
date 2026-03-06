const express = require('express');
const router = express.Router();
const bookingCtrl = require('../controllers/bookingController');

router.get('/', bookingCtrl.getAllBookings); // [cite: 46]
router.post('/', bookingCtrl.createBooking); // [cite: 48]
router.put('/:bookingId', bookingCtrl.updateBooking); // [cite: 52]
router.delete('/:bookingId', bookingCtrl.deleteBooking); // [cite: 54]

module.exports = router;