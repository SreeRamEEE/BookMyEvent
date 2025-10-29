const mongoose = require('mongoose');

const venueBookingSchema = new mongoose.Schema({
venueId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Venue',
        required: true
    },
  date: {
    type: String, // only the date (e.g. 2025-10-30)
    required: true,
  },
  startTime: {
    type: String
  },
  endTime: {
    type: String
  },
  bookedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Register',
  },
});

module.exports = mongoose.model('VenueBooking', venueBookingSchema);
