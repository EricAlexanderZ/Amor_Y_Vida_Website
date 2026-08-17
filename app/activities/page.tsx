import Link from "next/link";
import type { Metadata } from "next";
import { PageHero, Section, PhotoPlaceholder, GhostLink, CtaBand } from "@/components/ui";
import { activityCategories, dailySchedule } from "@/lib/site";
import { aspectFor } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Activities & Daily Life",
  description:
    "Lotería, live music, arts and crafts, chair exercise and celebrations. See what participants actually do each day at Amor Y Vida Adult Day Care Center in La Blanca, TX.",
  alternates: { canonical: "/activities" },
};

export default function ActivitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Activities"
        accent="marigold"
        title="What your loved one will actually do all day"
        lede="This is the question every family asks on the first phone call. Here is the honest answer, hour by hour."
      />

      {/* ── Categories ───────────────────────────────────────────────────── */}
      <Section
        eyebrow="Every week includes"
        title="Six things we do again and again"
        lede="Not because we run out of ideas, but because these are the ones participants ask for."
        accent="pink"
      >
        <div className="flex flex-col gap-16">
          {activityCategories.map((cat, i) => (
            <article key={cat.slug} id={cat.slug} className="scroll-mt-32">
              <div className={`mb-6 flex flex-col gap-3 ${i % 2 === 1 ? "lg:items-end lg:text-right" : ""}`}>
                <h3 className="text-3xl font-extrabold tracking-tight text-ink">{cat.title}</h3>
                <p className="max-w-2xl text-lg leading-relaxed text-ink-soft">{cat.blurb}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {(cat.shots ?? []).map((s) => (
                  <PhotoPlaceholder
                    key={s.src}
                    accent={cat.accent}
                    src={s.src}
                    aspect={aspectFor(s.src)}
                    label={s.alt}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                ))}
                {Array.from({ length: Math.max(0, cat.photoCount - (cat.shots?.length ?? 0)) }).map((_, n) => (
                  <PhotoPlaceholder
                    key={`pad-${n}`}
                    accent={cat.accent}
                    label={`${cat.title}, photo ${(cat.shots?.length ?? 0) + n + 1}`}
                  />
                ))}
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* ── Schedule ─────────────────────────────────────────────────────── */}
      <Section
        tinted
        eyebrow="The rhythm of the day"
        title="From the 6:30 AM welcome to the ride home"
        accent="teal"
      >
        <ol className="mx-auto flex w-full max-w-3xl flex-col gap-0">
          {dailySchedule.map((slot, i) => (
            <li key={slot.time} className="flex gap-5">
              <div className="flex flex-col items-center">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-teal text-xs font-extrabold tabular-nums text-white">
                  {i + 1}
                </span>
                {i < dailySchedule.length - 1 && <span className="w-0.5 flex-1 bg-line-strong" />}
              </div>
              <div className="flex flex-col gap-1 pb-8">
                <span className="text-sm font-extrabold tabular-nums text-teal-deep">{slot.time}</span>
                <span className="text-xl font-extrabold leading-snug text-ink">{slot.title}</span>
                <span className="text-[15px] leading-relaxed text-ink-soft">{slot.detail}</span>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* ── Gallery teaser ───────────────────────────────────────────────── */}
      <Section
        eyebrow="See it for yourself"
        title="Photos from inside the center"
        lede="Choosing care for a parent is hard to do from a phone screen. These are the rooms, the people and the ordinary days in between."
        accent="green"
      >
        <div className="flex flex-wrap justify-center gap-3">
          <GhostLink href="/gallery">Photo Gallery</GhostLink>
        </div>
      </Section>

      <Section tinted eyebrow="Ask us" title="Have something your loved one would enjoy?" accent="pink">
        <p className="mx-auto max-w-2xl text-center text-lg leading-relaxed text-ink-soft">
          Participants shape the calendar. If your mother played guitar, or your father worked
          with his hands, tell us. We build activities around what people already love. Reach us
          on the{" "}
          <Link href="/contact" prefetch={false} className="font-bold text-pink-deep hover:underline">
            contact page
          </Link>
          .
        </p>
      </Section>

      <CtaBand
        title="Come watch a lotería game"
        body="The best way to judge an adult day care is to stand in the room during an activity. Call and we will tell you when the next one starts."
      />
    </>
  );
}
