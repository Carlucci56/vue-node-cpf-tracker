const fs = require("fs");
const path = require("path");

const fileUploader = (file) => {
  if (!file) throw new Error("Nenhum arquivo enviado!");

  const timestamp = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });

  return {
    message: "Upload concluído!",
    filePath: `/uploads/${file.filename}`,
    timestamp,
  };
};

const fileReader = (fileName) => {
  if (!fileName) throw new Error("O nome do arquivo é necessário");

  return {
    message: "Leitura e inserção concluida!",
    inserts: 10
  };
};

module.exports = { fileUploader, fileReader };
