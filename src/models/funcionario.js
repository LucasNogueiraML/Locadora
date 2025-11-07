const mongoose = require("mongoose");

const funcionarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  cargo: { type: String, required: true },
  telefone: { type: String },
  email: { type: String },
  acesso: { type: Number, default: 1 }, // ex: 1 = comum, 2 = admin
});

// O nome do model é sempre no singular, e o Mongo cria a coleção no plural automaticamente
module.exports = mongoose.model("Funcionario", funcionarioSchema);
