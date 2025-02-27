const db = require("../../infra/firebase/firebase");

const insertDocumentHandler = async (cpf) => {
  var response;
  if (!cpf) throw new Error("CPF é obrigatório");

  const ref = db.ref("cpf").push();
  await ref.set({ cpf });

  response = { id: ref.key, cpf };
  console.log(response)
  return response;
};

const listDocumentHandler = async () => {
  const snapshot = await db.ref("cpf").once("value");
  console.log(snapshot)
  return snapshot.val() || {};
};

module.exports = { insertDocumentHandler, listDocumentHandler };
