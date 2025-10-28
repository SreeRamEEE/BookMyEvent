const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'venue_images/');
  },
  filename: (req, file, cb) => {
    console.log(req)
    console.log('Uploading file:', file);
    cb(null, Date.now() + '-' + file.originalname.trim().replace(/\s+/g, '_'));
  }
});
const venue_images = multer({ storage });


module.exports = venue_images;