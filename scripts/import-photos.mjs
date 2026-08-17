/**
 * Import client photos: correct, resize and convert to WebP.
 *
 * Run:  node scripts/import-photos.mjs --inspect      (report only, writes nothing)
 *       node scripts/import-photos.mjs --apply
 *
 * Source files come straight off the camera SD card at 6000x4000 / ~7MB each,
 * which is far too heavy to serve and (over 2000px) a known mobile-crash risk.
 * Output is a single ~1800px WebP master per photo; next/image generates the
 * responsive variants from that, so there is no need to emit sizes here.
 *
 * The "edit" is deliberately restrained — the goal is what a photographer would
 * do in Lightroom in 30 seconds, not a filter:
 *   1. auto-rotate from EXIF
 *   2. white balance: partial gray-world, CAPPED, because several frames are
 *      dominated by one colour (balloon arches, rainbow cupcakes) and a full
 *      correction reads those as a cast and drains them
 *   3. gentle S-curve for contrast
 *   4. modest saturation lift
 *   5. unsharp mask at final size, after the downscale
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const SRC = "E:/DCIM/101MEDIA";
const OUT = "public/images/photos";
const MAX_EDGE = 1800; // stays under the 2000px mobile-crash ceiling
const QUALITY = 82;

/**
 * source filename → output slug
 *
 * The first twelve were hand-named by the client. The rest were picked off the
 * card by reviewing contact sheets (see scripts/contact-sheets.mjs), so their
 * camera names are meaningless — the slug is what matters.
 */
const PHOTOS = {
  // ── client's own selects ────────────────────────────────────────────────
  "Hero.JPG":                          "hero-group",
  "Building Exterior 1.JPG":           "exterior-1",
  "Building Exterior 2.JPG":           "exterior-2",
  "Building Exterior 3.JPG":           "exterior-3",
  "Main Activity room wide.JPG":       "activity-room",
  "Outdoor shaded area.JPG":           "outdoor-seating",
  "Staff administering medication.JPG":"staff-medication",
  "Kitchen prepping food.JPG":         "kitchen-prep",
  "Live music afternoon.JPG":          "live-music",
  "Loteria game in progress.JPG":      "loteria",
  "Birthday celebration with cupcakes.JPG": "celebration-cupcakes",
  "Transportation van.JPG":            "transport-van",

  // ── rooms and facility ──────────────────────────────────────────────────
  "8V4A5611.JPG": "quiet-room",       // two beds made up in the rest room
  "8V4A5670.JPG": "lounge",           // couches and TV in the front lounge

  // ── care ────────────────────────────────────────────────────────────────
  "8V4A5692.JPG": "health-check",     // staff checking a participant, both faces visible
  "8V4A5709.JPG": "staff-assist",     // staff leaning in to help at the table

  // ── meals ───────────────────────────────────────────────────────────────
  "8V4A5576.JPG": "meal-tray",        // tray handed across the serving counter
  "8V4A5595.JPG": "coffee-bar",       // kitchen staff at the coffee bar
  "8V4A5650.JPG": "meal-fruit",       // participant with a plate of fresh fruit
  "8V4A5801.JPG": "kitchen-fruit",    // cutting grapes, gloved
  "8V4A5805.JPG": "kitchen-cooking",  // at the stove

  // ── music and dancing ───────────────────────────────────────────────────
  "8V4A5742.JPG": "couple-portrait",  // two participants posing together
  "8V4A5915.JPG": "singing-group",    // singing with the microphone
  "8V4A6220.JPG": "dancing-pair",     // two dancing in the open floor
  "8V4A6238.JPG": "dancing-arms-up",  // arms raised mid-dance
  "8V4A6239.JPG": "dancing-solo",     // dancing alone, laughing

  // ── lotería ─────────────────────────────────────────────────────────────
  "8V4A5989.JPG": "loteria-hat",      // man in a black hat marking his board
  "8V4A6053.JPG": "loteria-smiling",  // participant smiling over his board
  "8V4A6133.JPG": "loteria-table",    // long table mid-game
  "8V4A6145.JPG": "loteria-focus",    // close on the boards and markers
  "8V4A6177.JPG": "loteria-pair",     // two players side by side

  // ── celebrations ────────────────────────────────────────────────────────
  "8V4A6086.JPG": "cupcakes-tray",    // rainbow cupcakes laid out
  "8V4A6167.JPG": "celebration-arch", // staff member at the balloon arch
  "8V4A6186.JPG": "gift-bag",         // participant holding a gift bag
  "8V4A6188.JPG": "group-arch",       // group posed under the arch
};

const apply = process.argv.includes("--apply");

/**
 * Partial gray-world white balance.
 *
 * Full gray-world forces the average of every channel to match, which is right
 * for a neutral scene and badly wrong for a room full of coloured balloons. The
 * gain per channel is therefore blended toward 1.0 and hard-clamped, so a real
 * fluorescent cast gets corrected but a genuinely colourful frame is left alone.
 */
function whiteBalanceGains(channels, strength = 0.55, maxShift = 0.08) {
  const [r, g, b] = channels.map((c) => c.mean);
  const target = (r + g + b) / 3;
  return [r, g, b].map((mean) => {
    const raw = target / mean;
    const blended = 1 + (raw - 1) * strength;
    return Math.min(1 + maxShift, Math.max(1 - maxShift, blended));
  });
}

async function processPhoto(file, slug) {
  const src = path.join(SRC, file);
  if (!fs.existsSync(src)) return { slug, error: "missing" };

  const base = sharp(src).rotate(); // EXIF auto-orient must come first
  const meta = await base.metadata();
  const stats = await sharp(src).rotate().stats();
  const [gr, gg, gb] = whiteBalanceGains(stats.channels);

  const pipeline = sharp(src)
    .rotate()
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true })
    // White balance. linear() takes per-channel multipliers and offsets.
    .linear([gr, gg, gb], [0, 0, 0])
    // Gentle S-curve: lift contrast around midtones without crushing either end.
    .linear(1.06, -(128 * 0.06))
    // Slight gamma lift keeps shadows open after the contrast bump.
    .gamma(1.02)
    .modulate({ saturation: 1.09 })
    // Sharpen last, at output resolution, or the downscale softens it away.
    .sharpen({ sigma: 0.7, m1: 0.4, m2: 0.9 })
    .webp({ quality: QUALITY, effort: 5 });

  if (!apply) {
    const buf = await pipeline.toBuffer();
    return { slug, w: meta.width, h: meta.height, orient: meta.orientation ?? "-",
             gains: [gr, gg, gb].map((n) => n.toFixed(3)).join("/"),
             srcMB: (fs.statSync(src).size / 1e6).toFixed(1), outKB: (buf.length / 1e3).toFixed(0) };
  }

  fs.mkdirSync(OUT, { recursive: true });
  const dest = path.join(OUT, `${slug}.webp`);
  await pipeline.toFile(dest);
  const out = await sharp(dest).metadata();
  return { slug, w: meta.width, h: meta.height, orient: meta.orientation ?? "-",
           gains: [gr, gg, gb].map((n) => n.toFixed(3)).join("/"),
           srcMB: (fs.statSync(src).size / 1e6).toFixed(1),
           outKB: (fs.statSync(dest).size / 1e3).toFixed(0),
           outDim: `${out.width}x${out.height}` };
}

const results = [];
for (const [file, slug] of Object.entries(PHOTOS)) {
  results.push(await processPhoto(file, slug));
}

console.log(apply ? "APPLIED\n" : "DRY RUN (nothing written)\n");
console.table(results);
const totalIn  = results.reduce((n, r) => n + Number(r.srcMB || 0), 0);
const totalOut = results.reduce((n, r) => n + Number(r.outKB || 0), 0) / 1000;
console.log(`\n${totalIn.toFixed(1)} MB in  ->  ${totalOut.toFixed(1)} MB out`);
