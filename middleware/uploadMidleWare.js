const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'category_thumbnails/');
  },
  filename: (req, file, cb) => {
    console.log(req)
    console.log('Uploading file:', file);
    cb(null, Date.now() + '-' + file.originalname.trim().replace(/\s+/g, '_'));
  }
});
const category_thumbnails = multer({ storage });
module.exports = category_thumbnails;