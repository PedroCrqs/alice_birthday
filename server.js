const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const SHEET_API_URL =
  "https://script.google.com/macros/s/AKfycbxhs8FzE0rswswYWL0zl4YaMLVbdTP0oz0mNPLD779FoXOLAmYz9217LjeoeKuTCIqw/exec";

app.post("/confirm", async (req, res) => {
  const data = req.body;

  if (!data || !data.ListaConfirmados || !data.Timestamp) {
    return res.status(400).send("Dados de confirmação inválidos.");
  }

  const sheetData = {
    Timestamp: data.Timestamp,
    "Lista Confirmados": data.ListaConfirmados,
  };

  try {
    const sheetResponse = await fetch(SHEET_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sheetData),
    });

    if (!sheetResponse.ok) {
      const errorText = await sheetResponse.text();
      console.error("ERRO CRÍTICO HTTP:", sheetResponse.status, errorText);
      return res
        .status(500)
        .send("Erro no Apps Script. Verifique os logs do Render.");
    }

    const sheetResult = await sheetResponse.json();

    if (sheetResult && sheetResult.result === "success") {
      return res.send("Salvo no Google Sheets com sucesso!");
    } else {
      console.error(
        "APPS SCRIPT FALHOU (Status 200, mas erro interno):",
        sheetResult
      );
      return res
        .status(500)
        .send("Erro interno do Sheets. Consulte o log do Render.");
    }
  } catch (err) {
    console.error("ERRO DE CONEXÃO DO FETCH:", err.message);
    return res.status(500).send("Erro de conexão ao salvar. Verifique a URL.");
  }
});
app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
