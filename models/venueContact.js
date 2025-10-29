const mongoose= require('mongoose');
const venueContactSchema= new mongoose.Schema({
    venueId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Venue',
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});

module.exports= mongoose.model('VenueContact', venueContactSchema);
