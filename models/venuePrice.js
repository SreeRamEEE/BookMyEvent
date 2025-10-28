const mongoose = require('mongoose');

const venuePriceSchema = new mongoose.Schema({
    price: {
        type: String,
        required: true
    },
    venueId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Venue',
        required: true
    },
    offerredPrice: {
        type: String,
        required: false
    },
    ShowOfferredPrice: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('VenuePrice', venuePriceSchema);
