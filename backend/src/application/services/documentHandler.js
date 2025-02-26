const db = require("../../infra/firebase/firebase");

const insertDocumentHandler = async (cpf) => {
  if (!cpf) throw new Error("CPF é obrigatório");

  const ref = db.ref("cpf").push();
  await ref.set({ cpf });

  return { id: ref.key, cpf };
};

const listDocumentHandler = async () => {
  const snapshot = await db.ref("cpf").once("value");
  return snapshot.val() || {};
};

module.exports = { insertDocumentHandler, listDocumentHandler };
