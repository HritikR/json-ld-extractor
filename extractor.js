import { parse } from "node-html-parser";

export const extractJSONLD = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch URL: ${response.status} ${response.statusText}`);
        }
        const html = await response.text();
        const root = parse(html);
        const scripts = root.querySelectorAll('script[type="application/ld+json"]');

        const jsonLdData = scripts.map(script => safeParseJSON(script.textContent)).filter(data => data !== null);

        if (jsonLdData.length === 0) {
            throw new Error("No JSON-LD data was found on this webpage.");
        }

        return jsonLdData;
    } catch (error) {
        throw error;
    }
}

const safeParseJSON = (text) => {
    try {
        return JSON.parse(text);
    } catch (e) {
        console.warn("Failed to parse a JSON-LD script tag:", e.message);
        return null;
    }
} 
