const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const { insertDocumentHandler } = require("./documentHandler");

const fileUploader = (file) => {
  var response;
  if (!file) throw new Error("Nenhum arquivo enviado!");

  const timestamp = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });

  response = { message: "Upload concluído!", fileName: file.filename, filePath: `/uploads/${file.filename}`, timestamp };
  return response;
};

const fileReader = async (fileName) => {
  var response;
  if (!fileName) throw new Error("O nome do arquivo é necessário");

  const filePath = path.resolve(__dirname, "../../../uploads", fileName);

  if (!fs.existsSync(filePath)) throw new Error("Arquivo não encontrado!");

  const fileBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(fileBuffer);
  const rawText = data.text;
  const cpfRegex = /\b\d{3}\.\d{3}\.\d{3}-\d{2}\b/g;
  const cpfs = rawText.match(cpfRegex) || [];

  if (cpfs.length === 0) {
    response = { message: "Nenhum CPF encontrado!", inserts: 0, cpfs };
    console.log(response);
    return response
  }

  const insertions = await Promise.all(cpfs.map((cpf) => insertDocumentHandler(cpf)));

  response = { message: "Leitura e inserção concluída!", inserts: insertions.length, insertions };
  console.log(response);
  return 
};

module.exports = { fileUploader, fileReader };
