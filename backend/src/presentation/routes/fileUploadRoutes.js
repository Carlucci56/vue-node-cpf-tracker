const express = require("express");
const { uploadFile } = require("../controllers/fileController.js");
const upload = require("../../infra/multerConfig");

const router = express.Router();

router.post("/upload", upload.single("file"), async (req, res) => {
    console.time("UploadTime");
    await uploadFile(req, res);
    console.timeEnd("UploadTime");
  });

module.exports = router;
