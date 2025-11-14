const eventEmitter = require("events");

class UploadTracker extends eventEmitter {}

const tracker = new UploadTracker();
const progressState = {};  

tracker.on("uploadStarted", (fileName) => {
  console.log(`Upload started for file: ${fileName}`);
    progressState['value'] = 0;
});

tracker.on("uploadProgress", (fileName, progress) => {
  console.log(`Upload progress for file ${fileName}: ${progress}%`);
  progressState['value'] = progress;
  console.log(progress);
});
tracker.on("uploadCompleted", (fileName) => {
   progressState['value'] = 100;
  console.log(`Upload completed for file: ${fileName}`);
});

module.exports = { tracker, progressState };

