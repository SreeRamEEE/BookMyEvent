const venueBookingController = require('./../controllers/venueBooking');
const express = require('express');
const router = express.Router();
router.post('/book-venue', venueBookingController.bookVenue);
module.exports = router;