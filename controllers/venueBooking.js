
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


const getVenueBookingsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
   const bookings = await VenueBooking.aggregate([
      { $match: { bookedBy: new mongoose.Types.ObjectId(userId) } },
      {
        $lookup: {
          from: 'registers',
          localField: 'bookedBy',
          foreignField: '_id',
          as: 'register'
        }
      },
       { $unwind: '$register' },
      {
        $lookup: {
          from: 'venues',
          localField: 'venueId',
          foreignField: '_id',
          as: 'venue'
        },

      },
      { $unwind: '$venue' },
      {
        $lookup: {
          from :'venueprices',
          localField: 'venueId',
          foreignField: 'venueId',
          as: 'venuePrice'
        }
      },
      { $unwind: '$venuePrice' },
      { $project: {
          _id: 1,
          date: 1,
          startTime: 1,
          endTime: 1,
          bookedBy: {
            _id: '$register._id',
            name: '$register.name',
            mobile: '$register.mobile'
          },
          venue: {
            _id: '$venue._id',
            name: '$venue.name',
            location: '$venue.location',
             price: '$venuePrice.price'
          },
        
        }
      }
    ]);
    res.status(200).json({ data: { bookings }, message: "User bookings retrieved successfully" });
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllVenueBookings = async (req, res) => {
  try {

 
const bookings = await VenueBooking.aggregate([
      {
        $lookup: {
          from: 'registers',
          localField: 'bookedBy',
          foreignField: '_id',
          as: 'register'
        }
      },
       { $unwind: '$register' },
      {
        $lookup: {
          from: 'venues',
          localField: 'venueId',
          foreignField: '_id',
          as: 'venue'
        },

      },
      { $unwind: '$venue' },
      {
        $lookup: {
          from :'venueprices',
          localField: 'venueId',
          foreignField: 'venueId',
          as: 'venuePrice'
        }
      },
      { $unwind: '$venuePrice' },
      { $project: {
          _id: 1,
          date: 1,
          startTime: 1,
          endTime: 1,
          bookedBy: {
            _id: '$register._id',
            name: '$register.name',
            mobile: '$register.mobile'
          },
          venue: {
            _id: '$venue._id',
            name: '$venue.name',
            location: '$venue.location',
             price: '$venuePrice.price'
          },
        
        }
      }
    ]);



    // console.log(data);
    res.status(200).json({ data: { bookings }, message: "All venue bookings retrieved successfully" });
  } catch (error) {
    console.error("Error fetching all venue bookings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



module.exports = {
  bookVenue,
  getVenueBookingsByUser,
  getAllVenueBookings
};