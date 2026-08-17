import Link from "next/link";
import type { Metadata } from "next";
import {
  Section,
  CallButton,
  GhostLink,
  PhotoPlaceholder,
  InfoCard,
  CheckList,
  CtaBand,
} from "@/components/ui";
import { site, services, eligibilityCriteria, insurers, serviceAreas } from "@/lib/site";
import { photos } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Adult Day Care in La Blanca, TX | Serving the Rio Grande Valley",
  description:
    "Amor Y Vida Adult Day Care Center in La Blanca, TX provides health monitoring, hot meals, activities and transportation for seniors and adults across Hidalgo County. Bilingual staff. Most Medicaid plans accepted. Call (956) 270-4637.",
  alternates: { canonical: "/" },
};

const STATS = [
  { value: "5+", label: "Insurance plans accepted" },
  { value: "9.5", label: "Hours of care each weekday" },
  { value: "13", label: "RGV cities served" },
  { value: "100%", label: "Bilingual staff" },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-pink-tint">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:py-24">
          <div className="flex flex-col gap-6">
            <p className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-pink-deep shadow-sm">
              Serving La Blanca &amp; {site.address.county}
            </p>
            <h1 className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Caring for your loved ones{" "}
              <span className="text-pink-deep">with heart</span>
            </h1>
            <p className="max-w-xl text-pretty text-lg leading-relaxed text-ink-soft">
              Amor Y Vida is a licensed adult day care center in La Blanca, Texas. We provide
              health monitoring, hot meals, therapeutic activities and transportation, so your
              family can work knowing someone you love is safe, busy and looked after.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <CallButton />
              <GhostLink href="/activities">See a Day With Us</GhostLink>
            </div>
            <p className="text-sm font-semibold text-ink-mute">
              {site.hours.label} · Se habla español · Most Medicaid plans accepted
            </p>
          </div>

          <div className="relative">
            <PhotoPlaceholder
              accent="marigold"
              aspect="aspect-[5/4]"
              src={photos.heroGroup}
              // The only image above the fold, so it is the one worth preloading.
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              label="Participants and staff at Amor Y Vida Adult Day Care gathered together in the main activity room"
            />
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <section className="border-y border-line bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-10 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1 text-center">
              <span className="text-3xl font-extrabold tabular-nums text-pink-deep sm:text-4xl">{s.value}</span>
              <span className="text-sm font-bold leading-snug text-ink-soft">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Welcome ──────────────────────────────────────────────────────── */}
      <Section
        eyebrow="Welcome to Amor Y Vida"
        title="A place where every senior feels at home"
        accent="teal"
      >
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <PhotoPlaceholder
            accent="teal"
            aspect="aspect-[4/3]"
            src={photos.activityRoom}
            sizes="(min-width: 1024px) 50vw, 100vw"
            label="The main activity room at Amor Y Vida, tables set and ready for the day"
          />
          <div className="flex flex-col gap-5">
            <p className="text-lg leading-relaxed text-ink-soft">
              We believe every person deserves dignity, respect and joy regardless of age. Our
              center offers a safe, stimulating environment for adults who need daytime
              supervision and assistance, without leaving the family home behind.
            </p>
            <p className="text-lg leading-relaxed text-ink-soft">
              Our team provides personalized attention, social activities, health monitoring and
              nutritious meals, giving families peace of mind while they work or take care of
              daily responsibilities.
            </p>
            <CheckList
              accent="green"
              items={[
                "Licensed and certified in the State of Texas",
                "Fully bilingual staff, English and Spanish",
                "Transportation to and from the center",
                "Personalized care plan for every participant",
              ]}
            />
            <div className="flex flex-wrap gap-3 pt-2">
              <GhostLink href="/about">About Our Center</GhostLink>
              <GhostLink href="/services">Our Services</GhostLink>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Services ─────────────────────────────────────────────────────── */}
      <Section
        tinted
        eyebrow="What we offer"
        title="Everything included in a day of care"
        lede="One daily rate, covered by most plans. No à la carte pricing and no surprise add-ons."
        accent="pink"
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <InfoCard key={s.slug} title={s.title} accent={s.accent}>
              <p>{s.short}</p>
              <Link
                href={`/services#${s.slug}`}
                prefetch={false}
                className="mt-3 inline-block font-bold text-pink-deep hover:underline"
              >
                Learn more →
              </Link>
            </InfoCard>
          ))}
        </div>
      </Section>

      {/* ── Activities teaser ────────────────────────────────────────────── */}
      <Section
        eyebrow="Life at the center"
        title="See what a day actually looks like"
        lede="Families ask what their loved one will do all day. This is the honest answer: games, música, movement, meals and a lot of laughing."
        accent="marigold"
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <PhotoPlaceholder
            accent="marigold"
            src={photos.loteria}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            label="A participant marking her boards during a lotería game"
          />
          <PhotoPlaceholder
            accent="pink"
            src={photos.liveMusic}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            label="Participants singing together during a live music afternoon"
          />
          <PhotoPlaceholder
            accent="teal"
            src={photos.outdoorSeating}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            label="The shaded outdoor seating area in the center's fenced patio"
          />
          <PhotoPlaceholder
            accent="green"
            src={photos.celebration}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            label="Trays of iced cupcakes set out for a birthday celebration"
          />
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <GhostLink href="/gallery">Browse All Photos</GhostLink>
          <GhostLink href="/videos">Watch Our Videos</GhostLink>
        </div>
      </Section>

      {/* ── Eligibility ──────────────────────────────────────────────────── */}
      <Section tinted eyebrow="Do you qualify?" title="Who can attend Amor Y Vida" accent="green">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <p className="text-lg leading-relaxed text-ink-soft">
              Our program is designed for adults who need daytime supervision, health assistance
              or social engagement. Your loved one may qualify if any of these apply:
            </p>
            <CheckList items={eligibilityCriteria} accent="green" />
            <div className="pt-1">
              <GhostLink href="/eligibility">Check Eligibility</GhostLink>
            </div>
          </div>
          <PhotoPlaceholder
            accent="green"
            // The source frame is vertical, so it gets a portrait box rather
            // than being cropped to a landscape one.
            aspect="aspect-[3/4]"
            src={photos.staffMedication}
            sizes="(min-width: 1024px) 50vw, 100vw"
            label="A staff member administering medication to a participant at the center"
          />
        </div>
      </Section>

      {/* ── Insurance ────────────────────────────────────────────────────── */}
      <Section
        eyebrow="We work with your plan"
        title="Accepted insurance plans"
        lede="For most families there is no out-of-pocket cost. Call us and we will verify your coverage before you commit to anything."
        accent="teal"
      >
        <ul className="flex flex-wrap items-center justify-center gap-4">
          {insurers.map((i) => (
            <li
              key={i.name}
              className="flex min-h-[84px] w-full flex-1 items-center justify-center rounded-2xl border border-line bg-white px-5 py-5 text-center text-base font-extrabold text-ink-soft shadow-sm sm:w-auto sm:min-w-[200px]"
            >
              {i.name}
            </li>
          ))}
        </ul>
        <p className="text-center text-base text-ink-mute">
          Don&apos;t see your plan?{" "}
          <a href={site.phoneHref} className="font-bold text-pink-deep hover:underline">
            Call {site.phone}
          </a>{" "}
          and we will check for you.
        </p>
      </Section>

      {/* ── Service area (local SEO) ─────────────────────────────────────── */}
      <Section
        tinted
        eyebrow="Areas we serve"
        title="Daily transportation across the mid-Valley"
        lede="We coordinate door-to-door rides each weekday. If your city is on this list, we can likely pick up at your address."
        accent="pink"
      >
        <ul className="flex flex-wrap justify-center gap-3">
          {serviceAreas.map((area) => (
            <li key={area.slug}>
              <Link
                href={`/areas-we-serve/${area.slug}`}
                prefetch={false}
                className="inline-block rounded-full border border-line-strong bg-white px-5 py-2.5 text-base font-bold text-ink-soft transition hover:border-pink hover:text-pink-deep"
              >
                {area.city}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand />
    </>
  );
}
