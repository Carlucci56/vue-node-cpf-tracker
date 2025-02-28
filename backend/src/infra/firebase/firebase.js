const admin = require("firebase-admin");
const dotenv = require("dotenv");
const path = require("path");

// Carrega variáveis de ambiente do arquivo .env
dotenv.config();

/**
 * Importa as credenciais do Firebase do arquivo JSON.
 * O caminho do arquivo é resolvido dinamicamente para evitar problemas de compatibilidade que encontrei.
 */
const serviceAccount = require(path.join(__dirname, "firebaseServiceAccount.json"));

/**
 * Inicializa o Firebase Admin SDK com as credenciais do serviço.
 */
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount), // Autenticação usando a chave privada
  databaseURL: process.env.FIREBASE_DATABASE_URL, // URL do banco de dados obtida das variáveis de ambiente
});

/**
 * Instância do banco de dados Firebase Realtime Database.
 */
const db = admin.database();

module.exports = db;
