// first run a local instance of chrome with:
// "/c/Program Files/Google/Chrome/Application/chrome.exe" --remote-debugging-port=9222 --user-data-dir="C:\chromeData"

const fs = require("fs");
const puppeteer = require("puppeteer-core");

const URL = "https://www.youtube.com/@MuseAsia/playlists";
const OUTPUT = "allMuseurls.txt";

(async () => {
  const browser = await puppeteer.connect({
    browserURL: "http://127.0.0.1:9222"
  });

  const page = await browser.newPage();
  await page.goto(URL, { waitUntil: "networkidle2" });

  console.log("Scrolling...");

  // Scroll until bottom is stable for 3 checks
  await page.evaluate(async () => {
    let stableCount = 0;
    let last = document.documentElement.scrollHeight;

    while (stableCount < 3) {
      window.scrollTo(0, document.documentElement.scrollHeight);
      await new Promise(res => setTimeout(res, 1500));

      let newHeight = document.documentElement.scrollHeight;
      if (newHeight === last) stableCount++;
      else stableCount = 0;

      last = newHeight;
    }
  });

  console.log("Scroll complete. Extracting playlists…");

  // Extract playlists safely
  const urls = await page.evaluate(() => {
    const anchors = [
      ...document.querySelectorAll("a#thumbnail"),
      ...document.querySelectorAll("a[href*='playlist']")
    ];

    const links = anchors
      .map(a => a.href || "")
      .filter(h => typeof h === "string" && h.includes("playlist?list="));

    // remove duplicates
    return [...new Set(links)];
  });

  fs.writeFileSync(OUTPUT, urls.join("\n"), "utf8");

  console.log(`Saved ${urls.length} region-visible playlists → ${OUTPUT}`);
  await page.close();
})();
