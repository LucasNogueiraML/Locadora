const express = require("express");
const router = express.Router();
const Cliente = require("../models/cliente");

// Listar todos os clientes
router.get("/", async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Criar novo cliente
router.post("/", async (req, res) => {
  try {
    const novo = await Cliente.create(req.body);
    res.status(201).json(novo);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

// Atualizar cliente
router.put("/:id", async (req, res) => {
  try {
    const atualizado = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(atualizado);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Deletar cliente
router.delete("/:id", async (req, res) => {
  try {
    await Cliente.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Login de cliente
router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  try {
    const cliente = await Cliente.findOne({ email, senha });
    if (!cliente) {
      return res.status(401).json({ erro: "Email ou senha incorretos!" });
    }

    res.json({ nome: cliente.nome, id: cliente._id, email: cliente.email });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

module.exports = router;
