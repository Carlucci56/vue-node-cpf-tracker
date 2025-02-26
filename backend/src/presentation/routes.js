const express = require("express");
const { salvarCPF, listarCPFs } = require("./cpfController");

const router = express.Router();

router.post("/cpf", salvarCPF);
router.get("/cpfs", listarCPFs);

module.exports = router;
