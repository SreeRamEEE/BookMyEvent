const VenueController = require('../controllers/venueController');
const express = require('express');
const router = express.Router();

router.delete('/venue/:venueId', VenueController.deleteVenue);
module.exports = router;