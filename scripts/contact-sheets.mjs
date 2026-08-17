/**
 * Build contact sheets from the camera card so a whole shoot can be reviewed at
 * a glance instead of opening 650 files.
 *
 * Each thumbnail carries a burned-in index; `--map` prints index -> filename so
 * a pick can be traced back to its original. Sheets go to the scratch dir, not
 * into the repo — they are a review aid, not site content.
 *
 * Run: node scripts/contact-sheets.mjs [--cols 9] [--rows 7] [--thumb 220]
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const SRC = "E:/DCIM/101MEDIA";
const OUT = process.env.SHEET_OUT ?? "C:/Users/helio/AppData/Local/Temp/claude/c--Users-helio-Prospects-stitch-depot/157d3165-ba22-4dce-8dca-18b33cd54769/scratchpad/sheets";

const arg = (name, dflt) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? Number(process.argv[i + 1]) : dflt;
};

const COLS = arg("cols", 9);
const ROWS = arg("rows", 7);
const TW = arg("thumb", 220);          // thumb width
const TH = Math.round((TW * 2) / 3);   // 3:2 camera aspect
const PER = COLS * ROWS;
const LABEL = 16;                      // strip under each thumb for the index

/** Every JPG except the 12 already imported, which need no second look. */
const ALREADY = new Set([
  "Hero.JPG", "Building Exterior 1.JPG", "Building Exterior 2.JPG", "Building Exterior 3.JPG",
  "Main Activity room wide.JPG", "Outdoor shaded area.JPG", "Staff administering medication.JPG",
  "Kitchen prepping food.JPG", "Live music afternoon.JPG", "Loteria game in progress.JPG",
  "Birthday celebration with cupcakes.JPG", "Transportation van.JPG",
]);

const files = fs
  .readdirSync(SRC)
  .filter((f) => /\.jpe?g$/i.test(f) && !ALREADY.has(f))
  .sort();

fs.mkdirSync(OUT, { recursive: true });

const cellW = TW;
const cellH = TH + LABEL;

async function buildSheet(batch, sheetNo) {
  const rows = Math.ceil(batch.length / COLS);
  const W = COLS * cellW;
  const H = rows * cellH;

  const composites = [];
  for (let i = 0; i < batch.length; i++) {
    const x = (i % COLS) * cellW;
    const y = Math.floor(i / COLS) * cellH;
    const idx = sheetNo * PER + i;

    const thumb = await sharp(path.join(SRC, batch[i]))
      .rotate()
      .resize(TW, TH, { fit: "cover" })
      .toBuffer();
    composites.push({ input: thumb, left: x, top: y });

    // Index burned under each frame, so a pick can be named unambiguously.
    const label = Buffer.from(
      `<svg width="${cellW}" height="${LABEL}">
         <rect width="100%" height="100%" fill="#111"/>
         <text x="3" y="12" font-family="monospace" font-size="12" fill="#fff">${idx}</text>
       </svg>`
    );
    composites.push({ input: label, left: x, top: y + TH });
  }

  const out = path.join(OUT, `sheet-${String(sheetNo).padStart(2, "0")}.webp`);
  await sharp({ create: { width: W, height: H, channels: 3, background: "#222" } })
    .composite(composites)
    .webp({ quality: 72 })
    .toFile(out);
  return out;
}

if (process.argv.includes("--map")) {
  files.forEach((f, i) => console.log(`${i}\t${f}`));
} else {
  console.log(`${files.length} files to review -> ${Math.ceil(files.length / PER)} sheets of ${PER}`);
  for (let s = 0; s * PER < files.length; s++) {
    const out = await buildSheet(files.slice(s * PER, (s + 1) * PER), s);
    console.log(`  ${path.basename(out)}  (${s * PER}-${Math.min((s + 1) * PER, files.length) - 1})`);
  }
}
