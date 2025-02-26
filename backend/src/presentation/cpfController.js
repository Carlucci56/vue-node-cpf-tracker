const db = require("../infra/firebase/firebase");

// Post CPF
async function salvarCPF(req, res) {
  try {
    const { cpf } = req.body;
    if (!cpf) return res.status(400).send("CPF é obrigatório");

    const ref = db.ref("cpf").push();
    await ref.set({ cpf });

    res.status(201).send({ id: ref.key, cpf });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// Get ALL CPFs
async function listarCPFs(req, res) {
  try {
    const snapshot = await db.ref("cpf").once("value");

    const cpfs = snapshot.val();

    res.status(200).json(cpfs || {});
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = { salvarCPF, listarCPFs };
