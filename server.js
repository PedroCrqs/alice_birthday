const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const SHEET_API_URL =
  "https://script.google.com/macros/s/AKfycbxhs8FzE0rswswYWL0zl4YaMLVbdTP0oz0mNPLD779FoXOLAmYz9217LjeoeKuTCIqw/exec";

app.post("/confirm", (req, res) => {
  const data = req.body;

  if (!data || !data.ListaConfirmados || !data.Timestamp) {
    return res.status(400).send("Dados de confirmação inválidos.");
  }

  res.status(200).send("Confirmação recebida! Processando...");

  const sheetData = {
    Timestamp: data.Timestamp,
    "Lista Confirmados": data.ListaConfirmados,
  };

  fetch(SHEET_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sheetData),
  })
    .then(async (sheetResponse) => {
      if (!sheetResponse.ok) {
        const errorText = await sheetResponse.text();
        console.error("ERRO NO BACKGROUND (SHEETS):", errorText);
      } else {
        const result = await sheetResponse.json();
        console.log("SUCESSO BACKGROUND (SHEETS):", result);
      }
    })
    .catch((err) => {
      console.error("ERRO DE CONEXÃO NO BACKGROUND:", err.message);
    });
});

app.get("/", (req, res) => {
  res.send("Servidor online!");
});
app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
