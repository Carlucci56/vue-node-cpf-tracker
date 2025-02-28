const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const DocumentService = require("./documentHandler");
const LogRepository = require("../../infra/logRepository");
const logger = require("../../helpers/winstonConfig");

/**
 * @class FileService
 * @description Responsável pelo processamento de arquivos, incluindo upload e leitura de PDFs para extração de CPFs.
 */
class FileService {
  constructor() {
    this.documentService = new DocumentService();
    this.logRepository = new LogRepository();
  }

  /**
   * Processa o upload de um arquivo, retornando informações sobre ele.
   * @param {Object} file - O arquivo enviado pelo usuário.
   * @returns {Object} response - Mensagem de sucesso e detalhes do arquivo.
   * @throws {Error} Se nenhum arquivo for enviado.
   */
  fileUploader(file) {
    if (!file) {
      logger.error("Upload falhou: Nenhum arquivo enviado");
      throw new Error("Nenhum arquivo enviado!");
    }

    const timestamp = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
    const response = {
      message: "Upload concluído!",
      fileName: file.filename,
      filePath: `/uploads/${file.filename}`,
      timestamp,
    };

    logger.info("Upload realizado com sucesso", { fileName: file.filename, filePath: response.filePath, timestamp });
    return response;
  }

  /**
   * Lê um arquivo PDF, extrai CPFs do texto e insere no banco de dados.
   * @param {string} fileName - Nome do arquivo a ser lido.
   * @param {string} userIp - Endereço IP do usuário que fez o upload.
   * @returns {Promise<Object>} response - Resultado da leitura e inserção dos CPFs.
   * @throws {Error} Se o nome do arquivo não for fornecido ou o arquivo não for encontrado.
   */
  async fileReader(fileName, userIp) {
    if (!fileName) {
      logger.error("Erro ao ler arquivo: Nome do arquivo não fornecido");
      throw new Error("O nome do arquivo é necessário");
    }

    const filePath = path.resolve(__dirname, "../../../uploads", fileName);
    if (!fs.existsSync(filePath)) {
      logger.error("Erro ao ler arquivo: Arquivo não encontrado", { fileName });
      throw new Error("Arquivo não encontrado!");
    }

    logger.info("Iniciando leitura do arquivo", { fileName, userIp });

    const fileBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(fileBuffer);
    const rawText = data.text;

    const cpfRegex = /\b\d{3}\.\d{3}\.\d{3}-\d{2}\b/g;
    const cpfs = rawText.match(cpfRegex) || [];

    if (cpfs.length === 0) {
      logger.warn("Nenhum CPF encontrado no arquivo", { fileName, userIp });
      return {
        message: "Nenhum CPF encontrado!",
        inserts: 0,
        cpfs,
        user: userIp,
      };
    }

    logger.info("CPFs extraídos com sucesso", { fileName, cpfs, userIp });

    const lastUpdate = await this.logRepository.insertLastUploadLog(userIp, cpfs, fileName);
    logger.info("Registro de upload salvo", { lastUpdate });

    const insertions = await Promise.all(
      cpfs.map((cpf) => this.documentService.insertDocument(cpf, fileName, userIp))
    );

    logger.info("CPFs inseridos no banco de dados", { insertedCount: insertions.length, fileName, userIp });

    return {
      message: "Leitura e inserção concluída!",
      inserts: insertions.length,
      insertions,
      user: userIp,
    };
  }
}

module.exports = FileService;
