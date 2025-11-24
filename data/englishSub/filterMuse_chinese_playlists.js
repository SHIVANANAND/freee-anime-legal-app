import fs from "fs";
import path from "path";
import fetch from "node-fetch";

const API_KEY = "AddYourAPIKeyHere"; // Replace with your actual YouTube Data API key
const INPUT_FILE = "allMuseurls.txt";
const OUTPUT_FILE = "filteredChineseMuse_urls.txt";

function extractPlaylistId(url) {
  const match = url.match(/list=([A-Za-z0-9_-]+)/);
  return match ? match[1] : null;
}

// Detect Chinese characters
function containsChinese(text) {
  return /[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]/.test(text);
}

async function fetchTitle(playlistId) {
  const apiUrl = `https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&key=${API_KEY}`;
  const res = await fetch(apiUrl);

  if (!res.ok) {
    console.log(`✗ API error (ID: ${playlistId})`);
    return null;
  }

  const data = await res.json();
  return data.items?.[0]?.snippet?.title || null;
}

async function main() {
  const urls = fs.readFileSync(INPUT_FILE, "utf8").trim().split("\n");

  console.log(`Loaded ${urls.length} playlist URLs.`);
  console.log("Filtering Chinese titles...\n");

  const kept = [];

  for (const url of urls) {
    const id = extractPlaylistId(url);

    if (!id) {
      console.log(`✗ Could not extract ID from: ${url}`);
      continue;
    }

    const title = await fetchTitle(id);

    if (!title) {
      console.log(`[${id}] ✗ No title`);
      continue;
    }

    const isChinese = containsChinese(title);

    console.log(`[${id}] → ${title}`);
    console.log(`    ${isChinese ? "✗ Chinese ❌ (removed)" : "✓ OK (kept)"}`);

    if (!isChinese) kept.push(url);
  }

  fs.writeFileSync(OUTPUT_FILE, kept.join("\n"));
  console.log(`\nDone! Saved ${kept.length} filtered playlists → ${OUTPUT_FILE}`);
}

main();