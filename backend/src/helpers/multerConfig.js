const multer = require("multer");
const path = require("path");

/**
 * Configuração do Multer para armazenamento de arquivos no disco.
 */
const storage = multer.diskStorage({
  /**
   * Define o diretório onde os arquivos serão armazenados.
   * @param {Object} req - Objeto da requisição.
   * @param {Object} file - Objeto do arquivo enviado.
   * @param {Function} cb - Callback para definir o destino.
   */
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Define a pasta 'uploads/' como destino dos arquivos.
  },

  /**
   * Define o nome do arquivo salvo no servidor.
   * @param {Object} req - Objeto da requisição.
   * @param {Object} file - Objeto do arquivo enviado.
   * @param {Function} cb - Callback para definir o nome do arquivo.
   */
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Obtém a extensão do arquivo original.
    
    // Gera um timestamp formatado para evitar conflitos de nomes.
    const timestamp = new Date()
      .toISOString()
      .replace(/:/g, "-") // Substitui ":" por "-" para evitar os erros no Windows que encontrei.
      .replace(/\./g, "-");

    const newFilename = `upload-${timestamp}${ext}`; // Define o novo nome do arquivo.
    cb(null, newFilename);
  },
});

/**
 * Middleware de upload configurado com armazenamento no disco.
 */
const upload = multer({ storage });

module.exports = upload;
