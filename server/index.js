const express = require("express");
const cors = require("cors");
const path = require("path");
const { Client } = require("@notionhq/client");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

console.log("✅ Starting server...");
console.log("🔑 NOTION_API_KEY:", process.env.NOTION_API_KEY ? "Loaded" : "Missing");
console.log("🗃️ NOTION_DATABASE_ID:", process.env.NOTION_DATABASE_ID ? "Loaded" : "Missing");
console.log("📁 Serving static from:", path.join(__dirname, "build"));

app.use(cors({
  origin: "https://articles.dutchbrat.com", // ✅ or "*" if testing
}));

const articleRoutes = require('./routes/articles');
app.use('/api', articleRoutes);

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

// 1. Serve API first
app.get("/api/articles", async (req, res) => {
  try {
    const response = await notion.databases.query({ database_id: databaseId });

    const articles = response.results.map(page => ({
      id: page.id,
      date: page.properties?.Date?.date?.start || null,
      headline: page.properties?.Headline?.title?.[0]?.plain_text || "Untitled",
      summary: page.properties?.Summary?.rich_text?.[0]?.text?.content || "",
      tags: page.properties?.Tags?.multi_select?.map(t => t.name) || [],
      category: page.properties?.Category?.select?.name || null,
      link: page.properties?.Tweet?.url || null,
      status: page.properties?.Status?.status?.name || "Unknown",
      file: page.properties?.File?.url || null, // ✅ Correctly added
    }));

    res.json(articles);
  } catch (err) {
    console.error("❌ Failed to fetch articles from Notion:");
    console.error(err.body || err.message || err);
    res.status(500).json({ error: "Failed to load articles." });
  } // ✅ This closing brace was missing
});

// 2. Serve static files second
app.use(express.static(path.join(__dirname, "build")));

// 3. Fallback to index.html for all non-API, non-static requests
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});


app.listen(port, () => {
  console.log(`🚀 Listening on http://localhost:${port}`);
});

// Force commit