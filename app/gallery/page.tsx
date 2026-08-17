import type { Metadata } from "next";
import { PageHero, Section, PhotoPlaceholder, GhostLink, CtaBand } from "@/components/ui";
import { activityCategories } from "@/lib/site";
import { photos, aspectFor } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description:
    "Photos of daily life at Amor Y Vida Adult Day Care Center in La Blanca, TX. Activities, meals, celebrations and our facility. See the center before you visit.",
  alternates: { canonical: "/gallery" },
};

/** Facility shots live outside the activity categories. */
type FacilityTile = {
  label: string;
  accent: "pink" | "marigold" | "teal" | "green";
  /** Absent until that photo is taken — the tile then renders as a placeholder. */
  src?: string;
  aspect?: string;
};

const FACILITY: FacilityTile[] = [
  { label: "The front entrance on Hwy 107, with hours and phone numbers on the door", accent: "pink" as const, src: photos.entrance },
  { label: "The Amor Y Vida building and sign seen from the parking lot", accent: "marigold" as const, src: photos.buildingExterior },
  { label: "The main activity room with tables set for the day", accent: "teal" as const, src: photos.activityRoom },
  { label: "The center's window signage", accent: "green" as const, src: photos.signDetail, aspect: "aspect-[3/4]" },
  { label: "The shaded outdoor seating area", accent: "pink" as const, src: photos.outdoorSeating },
  { label: "A staff member helping a participant board the transport van", accent: "marigold" as const, src: photos.transportVan },
  { label: "The quiet room, with beds made up for rest during the day", accent: "teal" as const, src: photos.quietRoom },
  { label: "The front lounge where families wait and participants relax", accent: "green" as const, src: photos.lounge },
];

/** Tiles for one activity category: real photos first, padded with placeholders. */
function categoryTiles(cat: (typeof activityCategories)[number]) {
  const shots = cat.shots ?? [];
  const pad = Math.max(0, cat.photoCount - shots.length);
  return { shots, pad };
}

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Photo gallery"
        accent="pink"
        title="See the center before you visit"
        lede="Choosing care for a parent is hard to do from a phone screen. These photos show the rooms, the people and the ordinary days in between."
      />

      <Section eyebrow="Our facility" title="The building and the rooms" accent="teal">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FACILITY.map((f) => (
            <PhotoPlaceholder
              key={f.label}
              accent={f.accent}
              label={f.label}
              src={f.src}
              aspect={f.aspect}
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            />
          ))}
        </div>
      </Section>

      {activityCategories.map((cat, i) => (
        <Section
          key={cat.slug}
          id={cat.slug}
          tinted={i % 2 === 0}
          eyebrow="Activities"
          title={cat.title}
          lede={cat.blurb}
          accent={cat.accent}
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categoryTiles(cat).shots.map((s) => (
              <PhotoPlaceholder
                key={s.src}
                accent={cat.accent}
                src={s.src}
                aspect={aspectFor(s.src)}
                label={s.alt}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            ))}
            {Array.from({ length: categoryTiles(cat).pad }).map((_, n) => (
              <PhotoPlaceholder
                key={`pad-${n}`}
                accent={cat.accent}
                label={`${cat.title}, photo ${categoryTiles(cat).shots.length + n + 1}`}
              />
            ))}
          </div>
        </Section>
      ))}

      <Section eyebrow="Prefer video?" title="Watch instead of scrolling" accent="green">
        <div className="flex justify-center">
          <GhostLink href="/videos">Go to Videos</GhostLink>
        </div>
      </Section>

      <CtaBand
        title="Photos only go so far"
        body="Come stand in the room. Tours take about twenty minutes and you can drop in during operating hours."
      />
    </>
  );
}
