/**
 * Blow up a shortlist of contact-sheet indices for a closer look, and print
 * index -> filename so a final pick can be traced back to the card.
 *
 * Run: node scripts/review-picks.mjs 74,75,115,528 [--thumb 420]
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const SRC = "E:/DCIM/101MEDIA";
const OUT = "C:/Users/helio/AppData/Local/Temp/claude/c--Users-helio-Prospects-stitch-depot/157d3165-ba22-4dce-8dca-18b33cd54769/scratchpad/sheets";

const ALREADY = new Set([
  "Hero.JPG", "Building Exterior 1.JPG", "Building Exterior 2.JPG", "Building Exterior 3.JPG",
  "Main Activity room wide.JPG", "Outdoor shaded area.JPG", "Staff administering medication.JPG",
  "Kitchen prepping food.JPG", "Live music afternoon.JPG", "Loteria game in progress.JPG",
  "Birthday celebration with cupcakes.JPG", "Transportation van.JPG",
]);

const files = fs.readdirSync(SRC).filter((f) => /\.jpe?g$/i.test(f) && !ALREADY.has(f)).sort();

const ti = process.argv.indexOf("--thumb");
const TW = ti > -1 ? Number(process.argv[ti + 1]) : 420;
const TH = Math.round((TW * 2) / 3);
const LABEL = 20;
const COLS = 4;

const picks = (process.argv[2] ?? "").split(",").map(Number).filter((n) => !Number.isNaN(n));
if (!picks.length) { console.log("pass a comma-separated index list"); process.exit(1); }

const name = process.argv.includes("--name")
  ? process.argv[process.argv.indexOf("--name") + 1]
  : "picks";

const rows = Math.ceil(picks.length / COLS);
const cellH = TH + LABEL;
const composites = [];

for (let i = 0; i < picks.length; i++) {
  const f = files[picks[i]];
  if (!f) continue;
  const x = (i % COLS) * TW;
  const y = Math.floor(i / COLS) * cellH;
  composites.push({
    input: await sharp(path.join(SRC, f)).rotate().resize(TW, TH, { fit: "cover" }).toBuffer(),
    left: x, top: y,
  });
  composites.push({
    input: Buffer.from(
      `<svg width="${TW}" height="${LABEL}"><rect width="100%" height="100%" fill="#111"/>
       <text x="4" y="15" font-family="monospace" font-size="14" fill="#fff">${picks[i]}</text></svg>`
    ),
    left: x, top: y + TH,
  });
  console.log(`${picks[i]}\t${f}`);
}

const out = path.join(OUT, `${name}.webp`);
await sharp({ create: { width: COLS * TW, height: rows * cellH, channels: 3, background: "#222" } })
  .composite(composites)
  .webp({ quality: 80 })
  .toFile(out);
console.log(`\n-> ${out}`);
