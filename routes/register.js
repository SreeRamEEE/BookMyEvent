const registerController = require('./../controllers/register');
const express = require('express');
const router = express.Router();

router.post('/register', registerController.registerUser);
module.exports = router;
