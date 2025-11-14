const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'tracker/');
  },
  filename: (req, file, cb) => {
 //   console.log(req)
  //  console.log('Uploading file:', file);
    cb(null, Date.now() + '-' + file.originalname.trim().replace(/\s+/g, '_'));
  }
});
const tracker = multer({ storage });


module.exports = tracker;