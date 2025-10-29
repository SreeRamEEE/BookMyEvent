
const VenueBooking= require('../models/venueBooking');
const mongoose = require('mongoose');

const bookVenue = async (req, res) => {
  try {
    const { venueId, date, startTime, endTime, bookedBy } = req.body;
    const newBooking = new VenueBooking({
      venueId,
      date,
      startTime,
      endTime,
      bookedBy
    });
    await newBooking.save();
    res.status(201).json({ data: { booking: newBooking }, message: "Venue booked successfully" });
  } catch (error) {
    console.error("Error booking venue:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  bookVenue
};