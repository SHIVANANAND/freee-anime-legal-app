const fs = require("fs");
const path = require("path");
const ytpl = require("ytpl");

// ------------ CONFIG -----------------

const JSON_PATH = path.join(__dirname, "hindiSub.json");
const URLS_PATH = path.join(__dirname, "urls.txt");

// -------------------------------------

async function scrapePlaylist(url) {
  try {
    const id = await ytpl.getPlaylistID(url);
    const pl = await ytpl(id, { pages: Infinity });

    return {
      channel: pl.author?.name || "Unknown",
      title: pl.title,
      description: pl.description || "",
      link: url,
      videos: pl.items.map(v => ({
        title: v.title,
        link: v.shortUrl,
        thumbnail: v.bestThumbnail?.url || ""
      }))
    };

  } catch (err) {
    console.error("❌ Error scraping:", url, err.message);
    return null;
  }
}

(async () => {
  console.log("📌 Loading hindiSub.json...");
  const json = JSON.parse(fs.readFileSync(JSON_PATH, "utf8"));

  if (!json.hindiSub) json.hindiSub = [];

  console.log("📌 Reading playlist URLs...");
  const urls = fs.readFileSync(URLS_PATH, "utf8")
    .split("\n")
    .map(u => u.trim())
    .filter(u => u.length > 0);

  console.log(`📌 Found ${urls.length} URLs`);

  for (const url of urls) {
    console.log(`\n🔍 Scraping: ${url}`);

    const data = await scrapePlaylist(url);
    if (!data) continue;

    // Avoid duplicates
    const exists = json.hindiSub.some(p => p.link === data.link);
    if (exists) {
      console.log("⚠️ Already exists in JSON. Skipping.");
      continue;
    }

    json.hindiSub.push(data);
    console.log("✅ Added.");
  }

  // Save updated JSON
  fs.writeFileSync(JSON_PATH, JSON.stringify(json, null, 2));
  console.log("\n💾 Saved updated hindiSub.json");
})();