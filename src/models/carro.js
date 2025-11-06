const mongoose = require("mongoose");

const carroSchema = new mongoose.Schema({
  modelo: String,
  marca: String,
  ano: Number,
  placa: String,
  disponivel: Boolean
});

module.exports = mongoose.model("Carro", carroSchema);
