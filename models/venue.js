
const mongoose= require('mongoose');

const venueSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    
    capacity:{
        type: Number,
        required: true
    },
   category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'CategoryConfig',
    required:true
   }
});

module.exports= mongoose.model('Venue', venueSchema);