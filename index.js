import express from "express";
import { extractJSONLD } from "./extractor.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", async (req, res) => {
    const url = req.query.url;

    if (!url) {
        return res.type("text").send("JSON-LD Extractor\n\nUsage: Provide a target URL via the 'url' query parameter.");
    }

    try {
        const data = await extractJSONLD(url);
        res.json({ success: true, url, data });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`JSON-LD Extractor is running on http://localhost:${PORT}`);
});