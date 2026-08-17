import Link from "next/link";
import type { Metadata } from "next";
import { PageHero, Section, CtaBand } from "@/components/ui";
import { serviceAreas, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Areas We Serve",
  description:
    "Amor Y Vida Adult Day Care Center serves La Blanca, Edinburg, Weslaco, Elsa, Edcouch, Donna, Mercedes, Alamo, San Juan, Pharr, McAllen and the surrounding Rio Grande Valley with daily transportation.",
  alternates: { canonical: "/areas-we-serve" },
};

export default function AreasPage() {
  return (
    <>
      <PageHero
        eyebrow="Areas we serve"
        accent="pink"
        title="Daily transportation across the mid-Valley"
        lede="We coordinate door-to-door rides each weekday. If your city is listed here, there is a good chance we can pick up at your address."
      />

      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {serviceAreas.map((area) => (
            <Link
              key={area.slug}
              href={`/areas-we-serve/${area.slug}`}
              prefetch={false}
              className="group flex flex-col gap-2 rounded-[--radius-card] border border-line bg-white p-6 shadow-sm transition hover:border-pink hover:shadow-md"
            >
              <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-marigold-deep">
                {area.distance === "in town" ? "Our home" : area.distance}
              </span>
              <h2 className="text-2xl font-extrabold tracking-tight text-ink group-hover:text-pink-deep">
                {area.city}, TX
              </h2>
              <p className="text-[15px] leading-relaxed text-ink-soft">{area.blurb}</p>
              <span className="mt-1 font-bold text-pink-deep">Learn more →</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section tinted eyebrow="Not listed?" title="Call and ask anyway" accent="teal">
        <p className="mx-auto max-w-2xl text-center text-lg leading-relaxed text-ink-soft">
          Our routes change as participants join. If you are near the mid-Valley but do not see
          your city, call{" "}
          <a href={site.phoneHref} className="font-bold text-pink-deep hover:underline">
            {site.phone}
          </a>{" "}
          and we will tell you honestly whether we can reach you.
        </p>
      </Section>

      <CtaBand />
    </>
  );
}
