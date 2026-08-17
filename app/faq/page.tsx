import type { Metadata } from "next";
import { PageHero, Section, CtaBand } from "@/components/ui";
import { faqs, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers about cost, Medicaid coverage, transportation, hours, medications and enrollment at Amor Y Vida Adult Day Care Center in La Blanca, TX.",
  alternates: { canonical: "/faq" },
};

/**
 * FAQPage structured data. This is the one schema type most likely to earn
 * extra real estate in search results for a business like this. The questions
 * families type are close to verbatim matches for these.
 */
function FaqJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function FaqPage() {
  return (
    <>
      <FaqJsonLd />
      <PageHero
        eyebrow="Questions"
        accent="teal"
        title="The things families ask us first"
        lede="If your question is not here, call. We would rather answer it directly than have you guess."
      />

      <Section>
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
          {faqs.map((f, i) => (
            <details
              key={f.q}
              open={i === 0}
              className="group rounded-[--radius-card] border border-line bg-white px-6 py-5 shadow-sm"
            >
              <summary className="cursor-pointer list-none text-lg font-extrabold leading-snug text-ink marker:hidden">
                <span className="flex items-start justify-between gap-4">
                  {f.q}
                  <span
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-2xl font-black leading-none text-pink transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-[16px] leading-relaxed text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section tinted eyebrow="Still unsure?" title="Call and ask a person" accent="pink">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <a href={site.phoneHref} className="text-3xl font-extrabold text-pink-deep hover:underline">
            {site.phone}
          </a>
          <p className="text-base text-ink-mute">{site.hours.label} · Se habla español</p>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
