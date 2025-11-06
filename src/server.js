require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { conect } = require("./db");

const carroRoutes = require("./routes/carros.routes");

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use("/carros", carroRoutes);

const PORT = process.env.PORT || 3000;

conect().then(() => {
  app.listen(PORT, () => console.log(`🚗 Servidor rodando na porta ${PORT}`));
});
