const { MissingCPFError, MissingFileNameError, MissingUserIpError } = require("../exceptions/documentErrors");

/**
 * Representa um documento armazenado no sistema.
 */
class Document {
  /**
   * @param {string} cpf - CPF armazenado.
   * @param {string} fileName - Nome do arquivo associado.
   * @param {string} userIp - IP do usuário que fez o upload.
   * @throws {MissingCPFError | MissingFileNameError | MissingUserIpError}
   */
  constructor(cpf, fileName, userIp) {
    if (!cpf) throw new MissingCPFError();
    if (!fileName) throw new MissingFileNameError();
    if (!userIp) throw new MissingUserIpError();

    this.cpf = cpf;
    this.fileName = fileName;
    this.userIp = userIp;
  }
}

module.exports = Document;
