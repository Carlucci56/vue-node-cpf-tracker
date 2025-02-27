const { insertDocumentHandler, listDocumentHandler } = require("../../application/services/documentHandler");

// Post CPF
async function insertDocument(req, res) {
  try {
    const { cpf } = req.body;
    const response = await insertDocumentHandler(cpf);
    console.log(response);
    res.status(201).send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

// Get ALL CPFs
async function listDocument(req, res) {
  try {
    const response = await listDocumentHandler();
    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = { insertDocument, listDocument };
