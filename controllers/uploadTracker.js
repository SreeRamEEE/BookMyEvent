
const fs = require("fs");


const {tracker,progressState} = require("../middleware/tracker");



const uploadWithTracking = (req, res, next) => {

    tracker.emit("uploadStarted", req.file.originalname);
    const filePath = req.file.path;
    const fileSize = req.file.size;
    let uploadedBytes = 0;
    const readStream = fs.createReadStream(filePath);

    readStream.on("data", (chunk) => {
        uploadedBytes += chunk.length;
        const progress = Math.round((uploadedBytes / fileSize) * 100);
        tracker.emit("uploadProgress", req.file.originalname, progress);
    });
    readStream.on("end", () => {
        tracker.emit("uploadCompleted", req.file.originalname);
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error("Error deleting temp file:", err);
            }
        });
        res.status(200).json({ message: "File uploaded successfully." });
    });

   // readStream.pipe(writeStream);
  
};

const uploadProgress = (req, res) => {
    res.status(200).json({ progress:    progressState  });
};

module.exports = {uploadWithTracking, uploadProgress};