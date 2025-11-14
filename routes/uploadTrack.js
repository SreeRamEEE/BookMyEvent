const express = require('express');
const router = express.Router();
const uploader = require('../controllers/uploadTracker');
const tracker = require('../middleware/uplodMid');
router.post('/upload-tracker', tracker.single("image"), uploader.uploadWithTracking);
router.get('/upload-progress', uploader.uploadProgress);

module.exports = router;