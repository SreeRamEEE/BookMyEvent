const Register= require('../models/register');

const registerUser= async (req,res)=>{
    const { mobile, name, isAgent, isOtpVerified=false } = req.body;
    try {
        const newUser = new Register({ mobile, name, isAgent, isOtpVerified });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { registerUser };