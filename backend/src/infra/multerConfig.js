const multer = require("multer");
const path = require("path");

// Multer Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const timestamp = new Date().toISOString().replace(/:/g, "-").replace(/\./g, "-"); 
    const newFilename = `upload-${timestamp}${ext}`;
    cb(null, newFilename);
  },
});

// Middleware de upload
const upload = multer({ storage });

module.exports = upload;
