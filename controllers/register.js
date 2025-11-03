const bcrypt = require("bcrypt");
const twilio = require("twilio");
const Register= require('../models/register');

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();



const registerUser= async (req,res)=>{
    const { mobile, name, isAgent, isOtpVerified=false } = req.body;
    try {
        const existingUser = await Register.findOne({ mobile });
        console.log("Existing user found:", existingUser);
        if (existingUser) {
            return res.status(400).json({
                data: null,
                existingUser: true,
                message: "Mobile number already registered"
            });
        }
        const otp = generateOtp();
        const newUser = new Register({ mobile, name, isAgent: isAgent || false, isOtpVerified, otp, otpExpires: Date.now() + 5 * 60 * 1000 });
        await newUser.save();
        res.status(200).json({
            data:{
                mobile,
                otp
            },
            message: "User registered and OTP sent successfully"
        });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const loginUser = async (req, res) => {
    const { mobile, isAgent } = req.body;
    try {
        let user = await Register.findOne({ mobile });
        if (!user) {
            const otp = generateOtp();
            const newUser = new Register({
                 mobile,
                  otp,
                  otpExpires: Date.now() + 5 * 60 * 1000,
                  isAgent: isAgent || false,
                  isOtpVerified: false,
                  name: "Guest"
              });
            await newUser.save();
            user = newUser;
            res.status(200).json({
                data:{
                    mobile,
                    otp
                },
                message: "User registered and OTP sent successfully"
            });
        }else{
            const otp = generateOtp();
            user.otp = otp;
            user.otpExpires = Date.now() + 5 * 60 * 1000;
            await user.save();
            res.status(200).json({
                data: {
                    mobile,
                    otp
                },
                message: "OTP sent successfully"
            });
        }
     
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const verifyOtp = async (req, res) => {
    const { mobile, otp } = req.body;

    try {
        const user = await Register.findOne({ mobile });
        if (!user) {
            return res.status(404).json({
                data: null,
                message: "User not found"
            });
        }

        if (user.otp !== otp) {
            return res.status(400).json({
                data: null,
                message: "Invalid OTP"
            });
        }

        user.isOtpVerified = true;
        await user.save();
        res.status(200).json({
            data: { userId: user._id, name: user.name,isAgent: user.isAgent },
            message: "OTP verified successfully"
        });
    } catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { registerUser, verifyOtp, loginUser };