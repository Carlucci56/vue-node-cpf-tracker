const express = require("express");
const { uploadFile, readFile } = require("../controllers/fileController.js");
const upload = require("../../infra/multerConfig");

const router = express.Router();

router.post("/upload", upload.single("file"), uploadFile);

module.exports = router;
