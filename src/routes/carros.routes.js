const express = require("express");
const router = express.Router();
const Carro = require("../models/carro");
// Buscar carro por ID
router.get("/:id", async (req, res) => {
  try {
    const carro = await Carro.findById(req.params.id);
    if (!carro) return res.status(404).json({ error: "Carro não encontrado" });
    res.json(carro);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar carro por ID" });
  }
});

// Listar carros
router.get("/", async (req, res) => {
  const carros = await Carro.find();
  res.json(carros);
});

// Criar novo carro
router.post("/", async (req, res) => {
  const novo = await Carro.create(req.body);
  res.status(201).json(novo);
});

// Atualizar carro
router.put("/:id", async (req, res) => {
  const atualizado = await Carro.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(atualizado);
});

// Deletar carro
router.delete("/:id", async (req, res) => {
  await Carro.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router; // <- ESSA LINHA É ESSENCIAL
