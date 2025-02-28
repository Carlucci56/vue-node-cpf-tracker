const FileService = require("../../application/services/fileHandler");

/**
 * @class FileController
 * @description Controlador responsável pelo upload e processamento de arquivos PDF.
 */
class FileController {
  constructor() {
    this.fileService = new FileService();
  }

  /**
   * Processa o upload de um arquivo PDF e inicia a leitura para extração de CPFs.
   * @param {Object} req - Objeto de requisição do Express contendo o arquivo enviado.
   * @param {Object} res - Objeto de resposta do Express para envio da resposta ao cliente.
   */
  async uploadFile(req, res) {
    try {
      const userIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

      const uploadResponse = this.fileService.fileUploader(req.file);
      console.log(uploadResponse);

      const readerResponse = await this.fileService.fileReader(uploadResponse.fileName, userIp);

      res.status(200).send({ uploadResponse, readerResponse });
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}

module.exports = FileController;
