const express = require("express");
const FileController = require("../controllers/fileController.js");
const upload = require("../../helpers/multerConfig");

const router = express.Router();
const fileController = new FileController();

router.post("/upload", upload.single("file"), async (req, res) => {
    console.time("UploadTime");
    await fileController.uploadFile(req, res);
    console.timeEnd("UploadTime");
});

module.exports = router;
