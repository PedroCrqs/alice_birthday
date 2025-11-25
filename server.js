const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const FILE_PATH = path.join(__dirname, "log.txt");

if (!fs.existsSync(FILE_PATH)) {
  fs.writeFileSync(FILE_PATH, "Lista de Convidados Confirmados:");
}

app.post("/confirm", (req, res) => {
  const data = req.body;

  if (!data || !data.mainGuest || !data.confirmedList) {
    return res.status(400).send("Dados de confirmação inválidos.");
  }

  const line =
    `\n------------------------------------\n` +
    `Confirmação em: ${data.timestamp}\n` +
    `Convidado principal: ${data.mainGuest}\n` +
    `Família: ${data.familyName}\n` +
    `Confirmados: ${data.confirmedList.join(", ")}\n`;

  fs.appendFile(FILE_PATH, line, (err) => {
    if (err) {
      console.error("Erro ao salvar no arquivo:", err);
      return res.status(500).send("Erro ao salvar.");
    }
    return res.send("Salvo com sucesso!");
  });
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
