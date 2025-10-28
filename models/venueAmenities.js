const mongoose = require('mongoose');

const venueAmenitiesSchema = new mongoose.Schema({
    amenity: {
        type: String,
        required: true
    },
    venueId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Venue',
        required: true
    }
});

module.exports = mongoose.model('VenueAmenities', venueAmenitiesSchema);