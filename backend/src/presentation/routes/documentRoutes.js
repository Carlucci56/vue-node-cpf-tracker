const express = require("express");
const { insertDocument, listDocument } = require("../controllers/documentController");

const router = express.Router();

router.post("/document", insertDocument);
router.get("/documents", listDocument);

module.exports = router;
