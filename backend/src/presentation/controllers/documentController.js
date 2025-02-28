const DocumentService = require("../../application/services/documentHandler");

class DocumentController {
  constructor() {
    this.documentService = new DocumentService();
  }

  async insertDocument(req, res) {
    try {
      const { cpf, fileName } = req.body;
      if (!cpf) return res.status(400).send("CPF é obrigatório");
      if (!fileName) return res.status(400).send("Nome do arquivo é obrigatório");

      const userIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
      const response = await this.documentService.insertDocument(cpf, fileName, userIp);

      res.status(201).send(response);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async listDocuments(req, res) {
    try {
      const cpfs = await this.documentService.listDocuments();
      res.status(200).json(cpfs);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

module.exports = DocumentController;
