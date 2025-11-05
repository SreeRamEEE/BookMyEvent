const Venue= require('../models/venue');
const VenuePrice= require('../models/venuePrice');
const VenueContact= require('../models/venueContact');
const venueGallery= require('../models/venueGallery');
const venueAmenities= require('../models/venueAmenities');
const mongoose = require('mongoose');

const deleteVenue = async (req, res) => {
  try {
    const { venueId } = req.params;
    await Venue.findByIdAndDelete(venueId);
    await VenuePrice.deleteMany({ venueId });
    await VenueContact.deleteMany({ venueId });
    await venueGallery.deleteMany({ venueId });
    await venueAmenities.deleteMany({ venueId });
    res.status(200).json({ message: 'Venue and associated data deleted successfully' });
  } catch (error) {
    console.error("Error deleting venue:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
       
module.exports = {
  deleteVenue,
};
