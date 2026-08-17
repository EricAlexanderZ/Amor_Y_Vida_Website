/**
 * Single source of truth for everything factual about the business.
 *
 * NAP (name, address, phone) consistency is the backbone of local SEO. Google
 * cross-references it against the Google Business Profile and directory
 * listings, and a mismatch anywhere weakens the whole domain. So the address
 * and phone are declared once here and every page, footer and JSON-LD block
 * reads from this object. Never hardcode them in a component.
 *
 * All values below were taken from the client's previous site.
 */
import { photos } from "./photos";

export const site = {
  name: "Amor Y Vida Adult Day Care Center",
  shortName: "Amor Y Vida",
  tagline: "Caring for your loved ones with heart",
  description:
    "Amor Y Vida is a licensed adult day care center in La Blanca, Texas, serving seniors and adults across Hidalgo County with health monitoring, therapeutic activities, hot meals and transportation.",

  // Update this the moment the domain is live. Canonical URLs, the sitemap and
  // the JSON-LD all derive from it.
  url: "https://amoryvida.com",

  phone: "(956) 270-4637",
  phoneHref: "tel:+19562704637",

  email: "info@amoryvida.com",

  address: {
    street: "13600 Hwy 107",
    city: "La Blanca",
    state: "TX",
    stateFull: "Texas",
    zip: "78558",
    county: "Hidalgo County",
  },

  // Approximate. Replace with the exact pin from the Google Business Profile.
  geo: { lat: 26.3236, lng: -98.0442 },

  hours: {
    label: "Monday to Friday, 6:30 AM to 4:00 PM",
    short: "Mon to Fri, 6:30 AM to 4:00 PM",
    opens: "06:30",
    closes: "16:00",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  },

  social: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
  },
} as const;

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}`;

/* ─────────────────────────────────────────────────────────────────────────
   Services
   ───────────────────────────────────────────────────────────────────────── */

export type Service = {
  slug: string;
  title: string;
  short: string;
  body: string;
  icon: keyof typeof serviceIconNames;
  accent: "pink" | "marigold" | "teal" | "green";
  /** Real photograph of this service happening. Absent until one exists. */
  shot?: { src: string; alt: string };
};

const serviceIconNames = {
  heart: 1, pill: 1, activity: 1, smile: 1, meal: 1, van: 1,
} as const;

export const services: Service[] = [
  {
    slug: "health-monitoring",
    title: "Health Monitoring",
    short: "Daily vitals and wellness checks by trained staff.",
    body:
      "Our team checks vital signs, tracks weight, and watches for the small changes that matter: a rising blood pressure reading, a skipped meal, a new unsteadiness on the feet. Findings are logged every day and shared with families and physicians, so nothing is missed between doctor visits.",
    icon: "heart",
    accent: "pink",
    shot: {
      src: photos.healthCheck,
      alt: "A staff member checking on a participant during the daily wellness round",
    },
  },
  {
    slug: "medication-management",
    title: "Medication Management",
    short: "The right medication, at the right time, every day.",
    body:
      "Staff provide reminders and supervised administration on each participant's own schedule. For families juggling work and caregiving, this removes one of the heaviest daily worries. No missed doses, no doubling up, no confusion about which pill comes when.",
    icon: "pill",
    accent: "teal",
    shot: {
      src: photos.staffMedication,
      alt: "A staff member administering medication to a participant at the center",
    },
  },
  {
    slug: "therapeutic-activities",
    title: "Physical & Therapeutic Activities",
    short: "Gentle movement built around each person's ability.",
    body:
      "Chair exercise, guided stretching, balance work and walking groups, all scaled to what each participant can comfortably do. The goal is practical: keep people steady on their feet, keep joints moving, and protect the independence they still have.",
    icon: "activity",
    accent: "green",
    shot: {
      src: photos.dancingPair,
      alt: "Two participants dancing together on the open floor, one of the ways the center keeps people moving",
    },
  },
  {
    slug: "social-activities",
    title: "Social & Recreational Activities",
    short: "Lotería, music, crafts, movies and celebrations.",
    body:
      "Isolation is one of the real health risks of aging. Our days are built around being together: card games and lotería, música, arts and crafts, movie afternoons, birthday parties and holiday celebrations. Friendships form here, and they are the reason many participants ask to come back.",
    icon: "smile",
    accent: "marigold",
    shot: {
      src: photos.liveMusic,
      alt: "Participants singing together with a microphone during a music afternoon",
    },
  },
  {
    slug: "meals",
    title: "Nutritious Meals & Snacks",
    short: "Hot breakfast, lunch and snacks prepared fresh daily.",
    body:
      "Balanced meals cooked on site, with familiar home-style cooking participants actually want to eat. We accommodate diabetic, low-sodium, soft and other physician-directed diets, and we track intake for anyone whose appetite needs watching.",
    icon: "meal",
    accent: "pink",
    shot: {
      src: photos.kitchenPrep,
      alt: "Kitchen staff preparing fresh fruit for the day's meals",
    },
  },
  {
    slug: "transportation",
    title: "Transportation Assistance",
    short: "Safe rides to and from the center each weekday.",
    body:
      "We coordinate door-to-door transportation across our service area so that not having a ride is never the reason someone misses a day. Ask us about pickup for your address, because coverage extends throughout the mid-Valley.",
    icon: "van",
    accent: "teal",
    shot: {
      src: photos.transportVan,
      alt: "A staff member helping a participant board the center's transport van",
    },
  },
];

/* ─────────────────────────────────────────────────────────────────────────
   A day at the center. Drives the Activities page and the schedule table
   ───────────────────────────────────────────────────────────────────────── */

export const dailySchedule = [
  { time: "6:30 AM", title: "Doors open & arrivals", detail: "Warm greetings, morning check-in and vitals." },
  { time: "7:30 AM", title: "Breakfast", detail: "Hot breakfast served family-style." },
  { time: "9:00 AM", title: "Morning movement", detail: "Chair exercise and guided stretching." },
  { time: "10:00 AM", title: "Games & lotería", detail: "Cards, dominoes, bingo and lotería." },
  { time: "11:30 AM", title: "Lunch", detail: "Freshly prepared main meal of the day." },
  { time: "12:30 PM", title: "Rest & quiet time", detail: "Relaxation, television, or a nap in a calm space." },
  { time: "1:30 PM", title: "Arts, crafts & music", detail: "Creative projects and live music afternoons." },
  { time: "2:30 PM", title: "Afternoon snack", detail: "Light snack and social time." },
  { time: "3:00 PM", title: "Wind-down & departures", detail: "Day recap for families, then rides home." },
];

export type ActivityCategory = {
  slug: string;
  title: string;
  blurb: string;
  accent: "pink" | "marigold" | "teal" | "green";
  /**
   * Target number of tiles for this category once it is fully photographed.
   * Real entries in `shots` are rendered first and the remainder is padded with
   * "photo coming soon" tiles, so a category fills in as photos arrive.
   */
  photoCount: number;
  /** Real photographs, newest drop first. Empty until the client sends some. */
  shots?: { src: string; alt: string }[];
};

export const activityCategories: ActivityCategory[] = [
  { slug: "games-and-loteria", title: "Games & Lotería", blurb: "Lotería, bingo, dominoes and card tournaments. The loudest, most competitive part of the day.", accent: "marigold", photoCount: 6,
    shots: [
      { src: photos.loteria,        alt: "A participant marking her lotería boards during an afternoon game" },
      { src: photos.loteriaSmiling, alt: "A participant smiling as he places a marker on his lotería board" },
      { src: photos.loteriaHat,     alt: "A participant in a black hat concentrating on his lotería board" },
      { src: photos.loteriaTable,   alt: "The long table mid-game, boards and markers spread across it" },
      { src: photos.loteriaPair,    alt: "Two participants playing lotería side by side" },
      { src: photos.loteriaFocus,   alt: "Close view of lotería boards and coloured markers in play" },
    ] },
  { slug: "music-and-dancing", title: "Music & Dancing", blurb: "Live música, sing-alongs and afternoons where the chairs get pushed back.", accent: "pink", photoCount: 6,
    shots: [
      { src: photos.liveMusic,      alt: "Participants singing together with a microphone during a music afternoon" },
      { src: photos.singingGroup,   alt: "A group singing together around the microphone" },
      { src: photos.dancingPair,    alt: "Two people dancing together on the open floor of the activity room" },
      { src: photos.dancingArmsUp,  alt: "A participant dancing with her arms raised" },
      { src: photos.dancingSolo,    alt: "A participant dancing and laughing during the afternoon" },
      { src: photos.couplePortrait, alt: "Two participants posing arm in arm during a celebration" },
    ] },
  { slug: "arts-and-crafts", title: "Arts & Crafts", blurb: "Painting, seasonal decorations and handmade gifts participants take home to family.", accent: "teal", photoCount: 6 },
  { slug: "exercise-and-movement", title: "Exercise & Movement", blurb: "Chair aerobics, stretching circles and walking groups led at a comfortable pace.", accent: "green", photoCount: 6 },
  { slug: "celebrations", title: "Birthdays & Celebrations", blurb: "Birthdays, holidays, Día de las Madres and every reason we can find for cake.", accent: "pink", photoCount: 6,
    shots: [
      { src: photos.heroGroup,       alt: "Participants and staff gathered together for a themed celebration day" },
      { src: photos.celebration,     alt: "Trays of iced cupcakes set out for a birthday celebration" },
      { src: photos.groupArch,       alt: "A group of participants and staff posed together under the balloon arch" },
      { src: photos.cupcakesTray,    alt: "Rainbow-iced cupcakes laid out ready to serve" },
      { src: photos.giftBag,         alt: "A participant holding up a gift bag she was given" },
      { src: photos.celebrationArch, alt: "A staff member beside the decorated balloon arch" },
    ] },
  { slug: "meals-together", title: "Meals Together", blurb: "Breakfast and lunch served family-style, because eating alone is its own kind of hard.", accent: "marigold", photoCount: 6,
    shots: [
      { src: photos.kitchenPrep,    alt: "Kitchen staff preparing fresh fruit for the day's meals" },
      { src: photos.mealFruit,      alt: "A participant with a plate of freshly cut fruit" },
      { src: photos.kitchenCooking, alt: "Kitchen staff cooking the day's hot meal on the stove" },
      { src: photos.mealTray,       alt: "A meal tray handed across the serving counter" },
      { src: photos.kitchenFruit,   alt: "Gloved hands cutting fresh grapes in the kitchen" },
      { src: photos.coffeeBar,      alt: "Kitchen staff at the center's coffee bar" },
    ] },
];

export const videoPlaceholders = [
  { slug: "center-tour", title: "Take a tour of our center", duration: "2:14", blurb: "Walk through the activity room, dining area, quiet room and outdoor space." },
  { slug: "a-day-at-amor-y-vida", title: "A day at Amor Y Vida", duration: "3:02", blurb: "From the 6:30 AM welcome to the afternoon ride home." },
  { slug: "morning-exercise", title: "Morning exercise class", duration: "1:35", blurb: "Our chair exercise routine, led by staff every weekday." },
  { slug: "loteria-afternoon", title: "Lotería afternoon", duration: "1:48", blurb: "One of the liveliest hours on the schedule." },
  { slug: "family-testimonials", title: "What families tell us", duration: "2:40", blurb: "Families describe what changed after their loved one enrolled." },
  { slug: "holiday-celebration", title: "Holiday celebration", duration: "2:05", blurb: "Music, food and dancing at our annual posada." },
];

/* ─────────────────────────────────────────────────────────────────────────
   Eligibility, insurance, FAQ
   ───────────────────────────────────────────────────────────────────────── */

export const eligibilityCriteria = [
  "Adults 18 years and older who need daytime supervision",
  "Seniors managing chronic conditions such as diabetes, hypertension or COPD",
  "Individuals living with a physical or cognitive disability",
  "Adults recovering from surgery, illness or a hospital stay",
  "Anyone who would benefit from social interaction and mental stimulation",
  "Medicaid, Medicare and private insurance recipients",
];

export type Insurer = { name: string; logo?: string };

export const insurers: Insurer[] = [
  { name: "United Healthcare", logo: "/insurance/United_Insurance.svg" },
  { name: "Superior HealthPlan", logo: "/insurance/Superior_Insurance.svg" },
  { name: "Driscoll Health Plan", logo: "/insurance/Driscoll_Insurance.svg" },
  // Molina and Texas Health & Human Services logos were 7 MB raster-in-SVG
  // files. Rendered as wordmarks until optimised versions are supplied.
  { name: "Molina Healthcare" },
  { name: "Texas Health & Human Services" },
];

export const faqs = [
  {
    q: "What is adult day care?",
    a: "Adult day care is daytime supervision and support for adults who should not be alone during the day. Participants come in the morning and go home in the afternoon, so they keep living at home with family while receiving health monitoring, meals, activities and social contact during working hours.",
  },
  {
    q: "How much does it cost?",
    a: "For most families the answer is nothing out of pocket. Adult day care is covered by Medicaid managed care plans including STAR+PLUS, and we accept several private plans. Call us at " + site.phone + " and we will verify your coverage before you commit to anything.",
  },
  {
    q: "Does my loved one need to attend every day?",
    a: "No. Some participants come five days a week, others come one or two. We build the schedule around what your family needs and what the care plan supports.",
  },
  {
    q: "Do you provide transportation?",
    a: "Yes. We coordinate door-to-door rides to and from the center each weekday across our service area. Call with your address and we will confirm pickup.",
  },
  {
    q: "Do you speak Spanish?",
    a: "Sí. Our staff is fully bilingual, and Spanish is spoken throughout the day, in activities, at meals and with families. Nadie se queda sin entender.",
  },
  {
    q: "What if my loved one uses a wheelchair or walker?",
    a: "Our center is fully accessible, and staff assist with mobility throughout the day. Wheelchairs, walkers and canes are all accommodated.",
  },
  {
    q: "Can you manage medications during the day?",
    a: "Yes. Trained staff provide reminders and supervised administration according to each participant's prescribed schedule, and we document every dose.",
  },
  {
    q: "What are your hours?",
    a: `We are open ${site.hours.label}. We are closed weekends and major holidays.`,
  },
  {
    q: "How do we get started?",
    a: "Call us for a free tour. You will meet the staff, see the space, and we will walk you through eligibility and insurance. Most families complete enrollment within a week.",
  },
  {
    q: "What conditions do you accept?",
    a: "We support adults with a wide range of needs, including diabetes, hypertension, COPD, arthritis, post-stroke recovery, early to moderate dementia and general frailty. Call us to discuss your loved one's specific situation.",
  },
];

/* ─────────────────────────────────────────────────────────────────────────
   Service area. One page per city for local search
   ───────────────────────────────────────────────────────────────────────── */

export type ServiceArea = {
  slug: string;
  city: string;
  county: string;
  /** Drive time from the center, used in copy. Keep honest. */
  distance: string;
  blurb: string;
};

export const serviceAreas: ServiceArea[] = [
  { slug: "la-blanca", city: "La Blanca", county: "Hidalgo County", distance: "in town", blurb: "Our home. The center sits on Hwy 107 in the heart of La Blanca." },
  { slug: "edinburg", city: "Edinburg", county: "Hidalgo County", distance: "about 20 minutes", blurb: "We serve families throughout Edinburg with daily transportation to the center." },
  { slug: "weslaco", city: "Weslaco", county: "Hidalgo County", distance: "about 15 minutes", blurb: "A short drive south, with regular pickups across Weslaco each weekday." },
  { slug: "elsa", city: "Elsa", county: "Hidalgo County", distance: "about 10 minutes", blurb: "One of our closest communities, just east along Hwy 107." },
  { slug: "edcouch", city: "Edcouch", county: "Hidalgo County", distance: "about 10 minutes", blurb: "Neighboring Elsa, and well within our daily transportation route." },
  { slug: "donna", city: "Donna", county: "Hidalgo County", distance: "about 15 minutes", blurb: "Serving Donna families with door-to-door rides each morning." },
  { slug: "mercedes", city: "Mercedes", county: "Hidalgo County", distance: "about 20 minutes", blurb: "Regular service to Mercedes for participants across the mid-Valley." },
  { slug: "alamo", city: "Alamo", county: "Hidalgo County", distance: "about 20 minutes", blurb: "Transportation available throughout Alamo each weekday." },
  { slug: "san-juan", city: "San Juan", county: "Hidalgo County", distance: "about 25 minutes", blurb: "Serving San Juan families looking for daytime care close to home." },
  { slug: "pharr", city: "Pharr", county: "Hidalgo County", distance: "about 25 minutes", blurb: "Pharr participants join us daily with coordinated transportation." },
  { slug: "mcallen", city: "McAllen", county: "Hidalgo County", distance: "about 30 minutes", blurb: "We welcome McAllen families seeking bilingual adult day care." },
  { slug: "la-villa", city: "La Villa", county: "Hidalgo County", distance: "about 10 minutes", blurb: "Just up the road, and part of our core service area." },
  { slug: "monte-alto", city: "Monte Alto", county: "Hidalgo County", distance: "about 10 minutes", blurb: "Close-in service for Monte Alto families." },
];

export const serviceAreaNames = serviceAreas.map((a) => a.city);
