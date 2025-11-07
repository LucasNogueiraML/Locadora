const mongoose = require("mongoose");

const clienteSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  telefone: { type: String },
  email: { type: String },
  endereco: { type: String },
  dataNascimento: { type: Date },
  carroAlugado: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Carro", // nome do Model do carro
    default: null // cliente pode não ter carro alugado
  }
  
});

module.exports = mongoose.model("Cliente", clienteSchema);
