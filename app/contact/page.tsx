import type { Metadata } from "next";
import { PageHero, Section, InfoCard, PhotoPlaceholder } from "@/components/ui";
import { site, fullAddress, serviceAreaNames } from "@/lib/site";
import { photos } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Call Amor Y Vida Adult Day Care Center at (956) 270-4637 or visit us at 13600 Hwy 107, La Blanca, TX 78558. Open Monday through Friday, 6:30 AM to 4:00 PM.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        accent="pink"
        title="Talk to someone today"
        lede="We answer our own phone during operating hours. No call center, no ticket number."
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          {/* Primary contact details, mirrored from the single NAP source. */}
          <div className="flex flex-col gap-6 rounded-[--radius-card] border border-line bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-1">
              <h2 className="text-xs font-extrabold uppercase tracking-[0.18em] text-pink-deep">Call us</h2>
              <a href={site.phoneHref} className="text-4xl font-extrabold tracking-tight text-ink hover:text-pink-deep">
                {site.phone}
              </a>
              <p className="text-base text-ink-mute">English and Spanish · Se habla español</p>
            </div>

            <hr className="border-line" />

            <div className="flex flex-col gap-1">
              <h2 className="text-xs font-extrabold uppercase tracking-[0.18em] text-teal-deep">Visit us</h2>
              <address className="not-italic text-xl font-extrabold leading-relaxed text-ink">
                {site.address.street}
                <br />
                {site.address.city}, {site.address.state} {site.address.zip}
              </address>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 w-fit font-bold text-teal-deep hover:underline"
              >
                Open in Google Maps →
              </a>
            </div>

            <hr className="border-line" />

            <div className="flex flex-col gap-1">
              <h2 className="text-xs font-extrabold uppercase tracking-[0.18em] text-marigold-deep">Hours</h2>
              <p className="text-xl font-extrabold text-ink">{site.hours.label}</p>
              <p className="text-base text-ink-mute">Closed weekends and major holidays</p>
            </div>

            <hr className="border-line" />

            <div className="flex flex-col gap-1">
              <h2 className="text-xs font-extrabold uppercase tracking-[0.18em] text-leaf-deep">Email</h2>
              <a href={`mailto:${site.email}`} className="text-xl font-extrabold text-ink hover:text-pink-deep">
                {site.email}
              </a>
              <p className="text-base text-ink-mute">
                Email is checked daily, but calling is faster for anything urgent.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <PhotoPlaceholder
              accent="teal"
              aspect="aspect-[4/3]"
              // The doors rather than the building: this is the page someone
              // reads right before driving over, and the hours and both phone
              // numbers are legible on the glass.
              src={photos.entrance}
              sizes="(min-width: 1024px) 50vw, 100vw"
              label="The front entrance of Amor Y Vida at 13600 N Hwy 107, Suite 8, with opening hours and phone numbers on the doors"
            />
            <InfoCard title="Planning a visit?" accent="marigold">
              Mornings between 9:00 and 11:30 are the liveliest, with exercise, games and music
              all happening then. If you want to see the center at its busiest, come during that
              window.
            </InfoCard>
            <InfoCard title="Need transportation?" accent="green">
              We coordinate weekday rides across {serviceAreaNames.length} cities in the mid-Valley.
              Call with your address and we will confirm whether we can pick up.
            </InfoCard>
          </div>
        </div>
      </Section>

      <Section tinted eyebrow="Find us" title="On Hwy 107 in La Blanca" accent="pink">
        <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-[--radius-card] border border-line shadow-sm">
          {/* Static, no-JS embed. Loads lazily so it never blocks first paint. */}
          <iframe
            title={`Map showing ${site.name} at ${fullAddress}`}
            src={`https://maps.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[420px] w-full border-0"
          />
        </div>
      </Section>
    </>
  );
}
