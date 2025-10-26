const mongoose= require('mongoose');
const registerSchema= new mongoose.Schema({
    mobile:{
        type: String,
        unique: true,
    },
    name:{
        type: String,
    },
    isAgent:{
        type: Boolean,
    },
    isOtpVerified:{
        type: Boolean,
    },
    otp:{
        type: String,
    },
     otpExpires: { 
        type: Date 
    },
});

const Register= mongoose.model('Register', registerSchema);
module.exports= Register;