/**
 * Real photographs available to the site.
 *
 * Single source of truth for paths. Pages reference `photos.<key>` rather than
 * writing string paths, so a re-crop or a rename is one edit here.
 *
 * Files are produced by `scripts/import-photos.mjs`, which corrects, resizes to
 * 1800px and converts to WebP. Do not put camera originals in `public/` — they
 * are ~7MB each and over the 2000px mobile ceiling.
 *
 * Shot 2026-08-06 at the center's Hawaiian Day, which is why the decor is
 * consistent across the interiors. Worth mixing in an ordinary-day set later so
 * the site does not look like it only ever holds one party.
 */
export const photos = {
  /** Wide group shot, participants and staff together. The home hero. */
  heroGroup:        "/images/photos/hero-group.webp",
  /** Front doors: logo, hours, both phone numbers, Bienvenidos / Welcome. */
  entrance:         "/images/photos/exterior-1.webp",
  /** Building from the parking lot with the lit sign — the recognizable one. */
  buildingExterior: "/images/photos/exterior-2.webp",
  /** Portrait detail of the window sign. Vertical. */
  signDetail:       "/images/photos/exterior-3.webp",
  /** Activity room set for the day, tables and chairs. */
  activityRoom:     "/images/photos/activity-room.webp",
  /** Shaded concrete table and benches in the fenced patio. */
  outdoorSeating:   "/images/photos/outdoor-seating.webp",
  /** Staff member administering medication to a participant. Vertical. */
  staffMedication:  "/images/photos/staff-medication.webp",
  /** Kitchen staff preparing fresh fruit. */
  kitchenPrep:      "/images/photos/kitchen-prep.webp",
  /** Participants singing together with a microphone. */
  liveMusic:        "/images/photos/live-music.webp",
  /** Lotería in play, boards and markers on the table. */
  loteria:          "/images/photos/loteria.webp",
  /** Trays of iced cupcakes at a celebration. */
  celebration:      "/images/photos/celebration-cupcakes.webp",
  /** Staff helping a participant board the transport van. */
  transportVan:     "/images/photos/transport-van.webp",

  /* ── second pass: picked off the card to fill the empty slots ─────────── */

  /** Two made-up beds in the rest room. */
  quietRoom:        "/images/photos/quiet-room.webp",
  /** Couches and TV in the front lounge, where families wait. */
  lounge:           "/images/photos/lounge.webp",
  /** Staff checking a participant, both faces visible. Landscape. */
  healthCheck:      "/images/photos/health-check.webp",
  /** Staff leaning in to help a participant at the table. */
  staffAssist:      "/images/photos/staff-assist.webp",

  /** Meal tray handed across the serving counter. */
  mealTray:         "/images/photos/meal-tray.webp",
  /** Kitchen staff at the coffee bar. */
  coffeeBar:        "/images/photos/coffee-bar.webp",
  /** Participant holding a plate of fresh fruit. Vertical. */
  mealFruit:        "/images/photos/meal-fruit.webp",
  /** Gloved hands cutting grapes. Vertical. */
  kitchenFruit:     "/images/photos/kitchen-fruit.webp",
  /** Kitchen staff at the stove. */
  kitchenCooking:   "/images/photos/kitchen-cooking.webp",

  /** Two participants posing together. */
  couplePortrait:   "/images/photos/couple-portrait.webp",
  /** Singing together around the microphone. */
  singingGroup:     "/images/photos/singing-group.webp",
  /** Two dancing on the open floor. */
  dancingPair:      "/images/photos/dancing-pair.webp",
  /** Arms raised mid-dance. */
  dancingArmsUp:    "/images/photos/dancing-arms-up.webp",
  /** Dancing alone, laughing. Vertical. */
  dancingSolo:      "/images/photos/dancing-solo.webp",

  /** Man in a black hat marking his lotería board. */
  loteriaHat:       "/images/photos/loteria-hat.webp",
  /** Participant smiling over his board. */
  loteriaSmiling:   "/images/photos/loteria-smiling.webp",
  /** The long table mid-game. */
  loteriaTable:     "/images/photos/loteria-table.webp",
  /** Close on the boards and markers. */
  loteriaFocus:     "/images/photos/loteria-focus.webp",
  /** Two players side by side. */
  loteriaPair:      "/images/photos/loteria-pair.webp",

  /** Rainbow cupcakes laid out on the cart. */
  cupcakesTray:     "/images/photos/cupcakes-tray.webp",
  /** Staff member at the balloon arch. */
  celebrationArch:  "/images/photos/celebration-arch.webp",
  /** Participant holding a gift bag. Vertical. */
  giftBag:          "/images/photos/gift-bag.webp",
  /** Group posed together under the balloon arch. */
  groupArch:        "/images/photos/group-arch.webp",
} as const;

export type PhotoKey = keyof typeof photos;

/**
 * Photos the camera recorded rotated, so they land portrait after EXIF
 * correction. A landscape `aspect-[4/3]` box would crop these badly, so slots
 * check this set and switch to `aspect-[3/4]`.
 */
export const PORTRAIT: ReadonlySet<string> = new Set([
  photos.signDetail,
  photos.staffMedication,
  photos.mealFruit,
  photos.kitchenFruit,
  photos.dancingSolo,
  photos.giftBag,
]);

/** Aspect class for a photo, honouring the portrait exceptions above. */
export const aspectFor = (src?: string, landscape = "aspect-[4/3]") =>
  src && PORTRAIT.has(src) ? "aspect-[3/4]" : landscape;
