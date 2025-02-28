/**
 * Erro lançado quando o CPF não é fornecido.
 */
class MissingCPFError extends Error {
    constructor() {
      super("CPF é obrigatório");
      this.name = "MissingCPFError";
    }
  }
  
  /**
   * Erro lançado quando o nome do arquivo não é fornecido.
   */
  class MissingFileNameError extends Error {
    constructor() {
      super("Nome do arquivo é obrigatório");
      this.name = "MissingFileNameError";
    }
  }
  
  /**
   * Erro lançado quando o IP do usuário não é fornecido.
   */
  class MissingUserIpError extends Error {
    constructor() {
      super("Endereço IP é obrigatório");
      this.name = "MissingUserIpError";
    }
  }
  
  module.exports = { MissingCPFError, MissingFileNameError, MissingUserIpError };
  