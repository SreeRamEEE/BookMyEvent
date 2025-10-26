const registerController = require('./../controllers/register');
const express = require('express');
const router = express.Router();

router.post('/register', registerController.registerUser);
router.post('/verify-otp', registerController.verifyOtp);
router.post('/login', registerController.loginUser);
module.exports = router;
