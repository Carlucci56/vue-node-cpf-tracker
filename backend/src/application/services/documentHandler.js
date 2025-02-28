const FirebaseDocumentsRepository = require("../../infra/documentsRepository");
const LogRepository  = require("../../infra/logRepository");
const Document = require("../../domain/entities/document");

class DocumentService {
  constructor() {
    this.documentsRepository = new FirebaseDocumentsRepository();
    this.logRepository = new LogRepository();
  }

  /**
   * Insere um novo documento contendo um CPF no banco de dados.
   * @param {string} cpf - O CPF a ser armazenado.
   * @param {string} fileName - O nome do arquivo de onde o CPF foi extraído.
   * @param {string} userIp - O endereço IP do usuário que fez o upload.
   * @returns {Object} response - Objeto contendo os dados inseridos.
   * @throws {Error} Se qualquer um dos parâmetros obrigatórios não for fornecido.
   */
  async insertDocument(cpf, fileName, userIp) {
    const document = new Document(cpf, fileName, userIp);

    const response = await this.documentsRepository.insertDocument(document);
    console.log(response);
    return response;
  }

  /**
   * Retorna todos os documentos armazenados no banco de dados.
   * @returns {Object} documents - Lista de documentos armazenados.
   */
  async listDocuments() {
    const documents = await this.documentsRepository.listDocuments();
    var response = Object.values(documents).map(
      doc => new Document(doc.cpf, doc.fileName, doc.userIp)
    );
    console.log(response);
    return response;
  }

  async getLastUpload() {
    const response = await this.logRepository.getLastUpload();
    return response;
  }
}

module.exports = DocumentService;
