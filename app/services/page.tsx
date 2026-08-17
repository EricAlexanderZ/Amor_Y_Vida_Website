import type { Metadata } from "next";
import { PageHero, Section, PhotoPlaceholder, CtaBand } from "@/components/ui";
import { services, dailySchedule, site } from "@/lib/site";
import { aspectFor } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Health monitoring, medication management, therapeutic activities, hot meals and transportation at Amor Y Vida Adult Day Care Center in La Blanca, TX. Serving Hidalgo County and the Rio Grande Valley.",
  alternates: { canonical: "/services" },
};

const ACCENT_BAR = {
  pink: "bg-pink",
  marigold: "bg-marigold",
  teal: "bg-teal",
  green: "bg-leaf",
} as const;

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        accent="pink"
        title="Everything included in a day of care"
        lede="One daily rate covers all of it. For most families that rate is paid entirely by their Medicaid or private plan."
      />

      <Section>
        <div className="flex flex-col gap-16">
          {services.map((service, i) => (
            <article
              key={service.slug}
              id={service.slug}
              className="grid scroll-mt-32 items-center gap-10 lg:grid-cols-2"
            >
              <div className={`flex flex-col gap-4 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <span className={`h-1.5 w-16 rounded-full ${ACCENT_BAR[service.accent]}`} />
                <h2 className="text-3xl font-extrabold tracking-tight text-ink">{service.title}</h2>
                <p className="text-lg leading-relaxed text-ink-soft">{service.body}</p>
              </div>
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <PhotoPlaceholder
                  accent={service.accent}
                  // Some frames came off the camera rotated; aspectFor keeps
                  // those in a portrait box instead of cropping them.
                  aspect={aspectFor(service.shot?.src)}
                  src={service.shot?.src}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  label={service.shot?.alt ?? `${service.title}: candid photo of this service happening at the center`}
                />
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* ── Daily schedule ───────────────────────────────────────────────── */}
      <Section
        tinted
        eyebrow="A typical weekday"
        title="How the day is structured"
        lede="Predictable routine matters, especially for participants living with memory loss. The shape of the day stays the same; the activities inside it change."
        accent="marigold"
      >
        <div className="mx-auto w-full max-w-3xl overflow-x-auto rounded-[--radius-card] border border-line bg-white shadow-sm">
          <table className="w-full min-w-[34rem] border-collapse text-left">
            <caption className="sr-only">Daily schedule at Amor Y Vida Adult Day Care Center</caption>
            <thead>
              <tr className="bg-cream">
                <th scope="col" className="px-5 py-3 text-xs font-extrabold uppercase tracking-widest text-ink-mute">Time</th>
                <th scope="col" className="px-5 py-3 text-xs font-extrabold uppercase tracking-widest text-ink-mute">What happens</th>
              </tr>
            </thead>
            <tbody>
              {dailySchedule.map((slot) => (
                <tr key={slot.time} className="border-t border-line">
                  <td className="whitespace-nowrap px-5 py-4 align-top font-extrabold tabular-nums text-pink-deep">
                    {slot.time}
                  </td>
                  <td className="px-5 py-4">
                    <span className="block font-extrabold text-ink">{slot.title}</span>
                    <span className="block text-[15px] leading-relaxed text-ink-soft">{slot.detail}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-center text-base text-ink-mute">
          Center hours are {site.hours.label}. Participants may attend as many or as few days a
          week as their care plan supports.
        </p>
      </Section>

      <CtaBand
        title="Not sure which services your loved one needs?"
        body="Call us and describe the situation. We will tell you honestly whether adult day care is the right fit, and if it isn't, we will point you somewhere that is."
      />
    </>
  );
}
