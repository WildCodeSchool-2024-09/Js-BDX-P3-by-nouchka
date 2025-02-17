require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json()); // Permet d'envoyer des JSON
app.use(cors()); // Autorise les requêtes cross-origin

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Serveur démarré sur http://localhost:${PORT}`),
);
