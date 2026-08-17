import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero, Section, InfoCard, CheckList, PhotoPlaceholder, CtaBand, CallButton } from "@/components/ui";
import { serviceAreas, services, site, fullAddress } from "@/lib/site";
import { photos } from "@/lib/photos";

type Params = { params: Promise<{ slug: string }> };

/**
 * Statically generate one page per city at build time. These are the pages that
 * compete for "adult day care in <city>" searches, which is how most families
 * in the Valley actually look for this.
 */
export function generateStaticParams() {
  return serviceAreas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const area = serviceAreas.find((a) => a.slug === slug);
  if (!area) return {};

  const title = `Adult Day Care in ${area.city}, TX`;
  return {
    title,
    description: `Amor Y Vida Adult Day Care Center serves ${area.city}, Texas with health monitoring, hot meals, activities and door-to-door transportation. Bilingual staff, most Medicaid plans accepted. Call ${site.phone}.`,
    alternates: { canonical: `/areas-we-serve/${area.slug}` },
    openGraph: {
      title: `${title} | ${site.shortName}`,
      description: `Adult day care serving ${area.city} and ${area.county}, with daily transportation to our center in La Blanca.`,
      url: `${site.url}/areas-we-serve/${area.slug}`,
    },
  };
}

export default async function AreaPage({ params }: Params) {
  const { slug } = await params;
  const area = serviceAreas.find((a) => a.slug === slug);
  if (!area) notFound();

  const others = serviceAreas.filter((a) => a.slug !== area.slug);

  return (
    <>
      <PageHero
        eyebrow={`Serving ${area.county}`}
        accent="pink"
        title={`Adult day care for ${area.city} families`}
        lede={`${area.blurb} Our center is ${area.distance === "in town" ? "right here in town" : `${area.distance} away`}, and we coordinate weekday transportation.`}
      />

      <Section eyebrow={`Why ${area.city} families choose us`} title="Care that fits around a working week" accent="teal">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <p className="text-lg leading-relaxed text-ink-soft">
              Most families in {area.city} are managing the same problem: a parent or grandparent
              who should not spend the day alone, and adult children who cannot leave work to sit
              with them. Adult day care solves exactly that, without anybody moving out of the
              family home.
            </p>
            <p className="text-lg leading-relaxed text-ink-soft">
              Your loved one spends the day with us, getting meals, health checks, activities and company,
              and comes home in the afternoon. For most {area.city} families the cost is covered
              in full by a Medicaid managed care or private plan.
            </p>
            <CheckList
              accent="green"
              items={[
                `Door-to-door transportation from ${area.city} each weekday`,
                "Fully bilingual staff, English and Spanish",
                "Health monitoring and medication management on site",
                "Hot breakfast, lunch and snacks prepared daily",
                "Most Medicaid and private plans accepted",
              ]}
            />
            <div className="pt-1">
              <CallButton />
            </div>
          </div>
          <PhotoPlaceholder
            accent="teal"
            aspect="aspect-[4/3]"
            src={photos.transportVan}
            sizes="(min-width: 1024px) 50vw, 100vw"
            label={`A staff member helping a participant board the Amor Y Vida transport van, which serves ${area.city} and the surrounding area`}
          />
        </div>
      </Section>

      <Section tinted eyebrow="What's included" title={`Services available to ${area.city} participants`} accent="pink">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <InfoCard key={s.slug} title={s.title} accent={s.accent}>
              {s.short}
            </InfoCard>
          ))}
        </div>
        <div className="flex justify-center">
          <Link href="/services" prefetch={false} className="font-bold text-pink-deep hover:underline">
            See full service details →
          </Link>
        </div>
      </Section>

      <Section eyebrow="Getting here" title={`From ${area.city} to our center`} accent="marigold">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 rounded-[--radius-card] border border-line bg-white p-8 text-center shadow-sm">
          <address className="not-italic text-xl font-extrabold leading-relaxed text-ink">{fullAddress}</address>
          <p className="text-lg text-ink-soft">
            {area.distance === "in town"
              ? "Right here in La Blanca, on Hwy 107."
              : `Roughly ${area.distance} from ${area.city}.`}
          </p>
          <p className="text-lg text-ink-soft">{site.hours.label}</p>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-teal-deep hover:underline"
          >
            Get driving directions →
          </a>
        </div>
      </Section>

      <Section tinted eyebrow="Nearby" title="We also serve these communities" accent="green">
        <ul className="flex flex-wrap justify-center gap-3">
          {others.map((a) => (
            <li key={a.slug}>
              <Link
                href={`/areas-we-serve/${a.slug}`}
                prefetch={false}
                className="inline-block rounded-full border border-line-strong bg-white px-5 py-2.5 text-base font-bold text-ink-soft transition hover:border-pink hover:text-pink-deep"
              >
                {a.city}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand
        title={`Book a tour from ${area.city}`}
        body="Tours take about twenty minutes. Come during the morning if you want to see activities running."
      />
    </>
  );
}
