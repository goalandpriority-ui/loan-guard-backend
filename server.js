import express from "express";
import gplay from "google-play-scraper";

const app = express();

/* ROOT */
app.get("/", (req, res) => {
  res.send("Loan Guard AI Backend Running 🚀");
});

/* SEARCH APPS */
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
    res.status(500).json({ error: "Search failed" });
  }
});

/* 🔥 NEW: FETCH REVIEWS */
app.get("/reviews", async (req, res) => {
  const appId = req.query.appId;

  try {
    const reviews = await gplay.reviews({
      appId,
      sort: gplay.sort.NEWEST,
      num: 20
    });

    const texts = reviews.data.map(r => r.text);

    res.json(texts);
  } catch (e) {
    res.status(500).json({ error: "Review fetch failed" });
  }
});

app.listen(10000, () => console.log("Server running 🚀"));
