const express = require("express");
const router = express.Router();
const Carro = require("../models/carro");

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
