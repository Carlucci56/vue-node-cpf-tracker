const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const DocumentService = require("./documentHandler");

/**
 * @class FileService
 * @description Responsável pelo processamento de arquivos, incluindo upload e leitura de PDFs para extração de CPFs.
 */
class FileService {
  constructor() {
    this.documentService = new DocumentService();
  }

  /**
   * Processa o upload de um arquivo, retornando informações sobre ele.
   * @param {Object} file - O arquivo enviado pelo usuário.
   * @returns {Object} response - Mensagem de sucesso e detalhes do arquivo.
   * @throws {Error} Se nenhum arquivo for enviado.
   */
  fileUploader(file) {
    if (!file) throw new Error("Nenhum arquivo enviado!");

    const timestamp = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });

    return {
      message: "Upload concluído!",
      fileName: file.filename,
      filePath: `/uploads/${file.filename}`,
      timestamp,
    };
  }

  /**
   * Lê um arquivo PDF, extrai CPFs do texto e insere no banco de dados.
   * @param {string} fileName - Nome do arquivo a ser lido.
   * @param {string} userIp - Endereço IP do usuário que fez o upload.
   * @returns {Promise<Object>} response - Resultado da leitura e inserção dos CPFs.
   * @throws {Error} Se o nome do arquivo não for fornecido ou o arquivo não for encontrado.
   */
  async fileReader(fileName, userIp) {
    if (!fileName) throw new Error("O nome do arquivo é necessário");

    const filePath = path.resolve(__dirname, "../../../uploads", fileName);
    if (!fs.existsSync(filePath)) throw new Error("Arquivo não encontrado!");

    const fileBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(fileBuffer);
    const rawText = data.text;

    const cpfRegex = /\b\d{3}\.\d{3}\.\d{3}-\d{2}\b/g;
    const cpfs = rawText.match(cpfRegex) || [];

    if (cpfs.length === 0) {
      const response = {
        message: "Nenhum CPF encontrado!",
        inserts: 0,
        cpfs,
        user: userIp,
      };
      console.log(response);
      return response;
    }

    const insertions = await Promise.all(cpfs.map((cpf) => this.documentService.insertDocument(cpf, fileName, userIp)));

    const response = {
      message: "Leitura e inserção concluída!",
      inserts: insertions.length,
      insertions,
      user: userIp,
    };
    console.log(response);
    return response;
  }
}

module.exports = FileService;
