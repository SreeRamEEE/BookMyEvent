
const mongoose= require('mongoose');

const jewellerySchema= new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    material:{
        type: String,
        required: true
    },
    
   category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'CategoryConfig',
    required:true
   }
});

module.exports= mongoose.model('Jewellery', jewellerySchema);