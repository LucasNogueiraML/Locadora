const express = require("express");
const router = express.Router();
const Funcionario = require("../models/funcionario");

// Listar todos os funcionários
router.get("/", async (req, res) => {
  try {
    const funcionarios = await Funcionario.find();
    res.json(funcionarios);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Criar novo funcionário
router.post("/", async (req, res) => {
  try {
    const novo = await Funcionario.create(req.body);
    res.status(201).json(novo);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

// Atualizar funcionário
router.put("/:id", async (req, res) => {
  try {
    const atualizado = await Funcionario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!atualizado) {
      return res.status(404).json({ erro: "Funcionário não encontrado" });
    }
    res.json(atualizado);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Deletar funcionário
router.delete("/:id", async (req, res) => {
  try {
    const removido = await Funcionario.findByIdAndDelete(req.params.id);
    if (!removido) {
      return res.status(404).json({ erro: "Funcionário não encontrado" });
    }
    res.status(200).json({ mensagem: "Funcionário removido com sucesso" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

module.exports = router;
