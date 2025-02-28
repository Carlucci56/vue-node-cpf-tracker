const FirebaseDocumentsRepository = require("../../infra/documentsRepository");
const LogRepository = require("../../infra/logRepository");
const Document = require("../../domain/entities/document");
const logger = require("../../helpers/winstonConfig");

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
    try {
      const document = new Document(cpf, fileName, userIp);
      const response = await this.documentsRepository.insertDocument(document);
      
      logger.info("Documento inserido com sucesso", { cpf, fileName, userIp, response });
      return response;
    } catch (error) {
      logger.error("Erro ao inserir documento", { cpf, fileName, userIp, error: error.message });
      throw error;
    }
  }

  /**
   * Retorna todos os documentos armazenados no banco de dados.
   * @returns {Object} documents - Lista de documentos armazenados.
   */
  async listDocuments() {
    try {
      const documents = await this.documentsRepository.listDocuments();
      const response = Object.values(documents).map(
        doc => new Document(doc.cpf, doc.fileName, doc.userIp)
      );
      
      logger.info("Listagem de documentos realizada", { count: response.length });
      return response;
    } catch (error) {
      logger.error("Erro ao listar documentos", { error: error.message });
      throw error;
    }
  }

  async getLastUpload() {
    try {
      const response = await this.logRepository.getLastUpload();
      logger.info("Último upload recuperado", { response });
      return response;
    } catch (error) {
      logger.error("Erro ao recuperar último upload", { error: error.message });
      throw error;
    }
  }
}

module.exports = DocumentService;
