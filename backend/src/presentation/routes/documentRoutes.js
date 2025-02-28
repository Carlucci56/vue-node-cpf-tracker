const express = require("express");
const DocumentController = require("../controllers/documentController");

const router = express.Router();
const documentController = new DocumentController();

router.post("/document", (req, res) => documentController.insertDocument(req, res));
router.get("/documents", (req, res) => documentController.listDocuments(req, res));

module.exports = router;
