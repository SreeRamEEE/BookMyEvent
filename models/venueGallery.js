const mongoose = require('mongoose');

const venueGallerySchema = new mongoose.Schema({
    venueId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Venue',
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    imageType: {
        type: String,
        enum: ['thumbnail', 'gallery'],
        default: 'gallery'
    }
});

const VenueGallery = mongoose.model('VenueGallery', venueGallerySchema);

module.exports = VenueGallery;
