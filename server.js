import express from "express";
import gplay from "google-play-scraper";

const app = express();

app.get("/", (req, res) => {
  res.send("Loan Guard AI Backend Running 🚀");
});

app.get("/search", async (req, res) => {
  const q = req.query.q;

  try {
    const results = await gplay.search({
      term: q,
      num: 10,
      country: "in"
    });

    res.json(results);
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch" });
  }
});

app.listen(10000, () => console.log("Server running"));
