const db = require("./firebase/firebase");

class FirebaseDocumentsRepository {
  async insertDocument(document) {
    const ref = db.ref("cpf").push();
    await ref.set({
      cpf: document.cpf,
      fileName: document.fileName,
      userIp: document.userIp,
    });

    return { id: ref.key, ...document };
  }

  async listDocuments() {
    const snapshot = await db.ref("cpf").once("value");
    return snapshot.val() || {};
  }
}

module.exports = FirebaseDocumentsRepository;
