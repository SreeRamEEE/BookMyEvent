const mongoose= require('mongoose');
const registerSchema= new mongoose.Schema({
    mobile:{
        type: String,
    },
    name:{
        type: String,
    },
    isAgent:{
        type: Boolean,
    },
    isOtpVerified:{
        type: Boolean,
    }
});

const Register= mongoose.model('Register', registerSchema);
module.exports= Register;