const venueBookingController = require('./../controllers/venueBooking');
const express = require('express');
const router = express.Router();
router.post('/book-venue', venueBookingController.bookVenue);
router.get('/user-bookings/:userId', venueBookingController.getVenueBookingsByUser);
module.exports = router;