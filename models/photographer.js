
const mongoose= require('mongoose');

const photographerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    experience:{
        type: String,
        required: true
    },
    cameraBrand:{
        type: String,
        required: true
    },
    
   category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'CategoryConfig',
    required:true
   }
});

module.exports= mongoose.model('Photographer', photographerSchema);