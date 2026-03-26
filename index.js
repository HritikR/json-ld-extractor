import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Welcome to the JSON-LD Extractor API!");
});

app.listen(PORT, () => {
  console.log(`JSON-LD Extractor is running on http://localhost:${PORT}`);
});