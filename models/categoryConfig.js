const mongoose= require('mongoose');
const categoryConfigSchema= new mongoose.Schema({
    category:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    
    description:{
        type: String,
        required: true
    },
    imageUrl:{
        type: String,
        required: true
    }
});

module.exports= mongoose.model('CategoryConfig', categoryConfigSchema);