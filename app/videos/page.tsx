import type { Metadata } from "next";
import { PageHero, Section, VideoPlaceholder, GhostLink, CtaBand } from "@/components/ui";
import { videoPlaceholders, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Video Tour",
  description:
    "Watch a video tour of Amor Y Vida Adult Day Care Center in La Blanca, TX. See the activity room, dining area and a full day of activities before you visit.",
  alternates: { canonical: "/videos" },
};

export default function VideosPage() {
  const [feature, ...rest] = videoPlaceholders;

  return (
    <>
      <PageHero
        eyebrow="Video"
        accent="teal"
        title="Walk through the center without leaving home"
        lede="Especially useful for adult children living out of the Valley who are helping choose care from a distance."
      />

      <Section eyebrow="Start here" title={feature.title} lede={feature.blurb} accent="pink">
        <div className="mx-auto w-full max-w-3xl">
          <VideoPlaceholder
            title={feature.title}
            duration={feature.duration}
            blurb={feature.blurb}
            accent="pink"
          />
        </div>
      </Section>

      <Section tinted eyebrow="More video" title="Inside a normal week" accent="marigold">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((v, i) => (
            <VideoPlaceholder
              key={v.slug}
              title={v.title}
              duration={v.duration}
              blurb={v.blurb}
              accent={(["teal", "green", "marigold", "pink"] as const)[i % 4]}
            />
          ))}
        </div>
      </Section>

      <Section eyebrow="Questions while you watch" title="We would rather talk than have you guess" accent="green">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <p className="text-lg leading-relaxed text-ink-soft">
            If something in a video raises a question about mobility support, medications,
            dietary needs or transportation, call and ask. We answer the phone ourselves.
          </p>
          <a href={site.phoneHref} className="text-2xl font-extrabold text-pink-deep hover:underline">
            {site.phone}
          </a>
          <GhostLink href="/faq">Read Common Questions</GhostLink>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
