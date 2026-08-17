import type { Metadata } from "next";
import { PageHero, Section, PhotoPlaceholder, CheckList, InfoCard, CtaBand } from "@/components/ui";
import { site, fullAddress } from "@/lib/site";
import { photos } from "@/lib/photos";

export const metadata: Metadata = {
  title: "About Our Center",
  description:
    "Amor Y Vida Adult Day Care Center is a licensed, bilingual adult day care in La Blanca, Texas, serving families across Hidalgo County and the Rio Grande Valley.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        accent="teal"
        title="Su familia es nuestra familia"
        lede="Amor Y Vida was built around a simple idea: aging should not mean spending the day alone. We give adults somewhere to go, something to do and people to be with, and we give families the ability to keep working."
      />

      <Section eyebrow="Our story" title="Rooted in the Valley" accent="pink">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <p className="text-lg leading-relaxed text-ink-soft">
              We sit on Hwy 107 in La Blanca, right between Edinburg and Weslaco, deliberately
              close to the smaller communities that usually get left out when families go looking
              for adult day care. Elsa, Edcouch, La Villa and Monte Alto are all minutes away.
            </p>
            <p className="text-lg leading-relaxed text-ink-soft">
              Most of the families we serve are caring for a parent or grandparent while holding
              down a full-time job. They are not looking to place someone in a facility. They are
              looking for somewhere safe and warm for the hours between the morning shift and the
              evening one. That is exactly what we are.
            </p>
            <p className="text-lg leading-relaxed text-ink-soft">
              Everything here happens in both English and Spanish, because that is how families in
              the Valley actually live.
            </p>
          </div>
          <PhotoPlaceholder
            accent="pink"
            aspect="aspect-[4/3]"
            src={photos.buildingExterior}
            sizes="(min-width: 1024px) 50vw, 100vw"
            label="The Amor Y Vida Adult Day Care building and sign, seen from the parking lot"
          />
        </div>
      </Section>

      <Section tinted eyebrow="What guides us" title="How we run the day" accent="marigold">
        <div className="grid gap-6 md:grid-cols-3">
          <InfoCard title="Dignity first" accent="pink">
            Every participant is an adult with a life behind them. We speak to people that way,
            and we never talk over someone to their family member.
          </InfoCard>
          <InfoCard title="Small enough to notice" accent="teal">
            Staff know each participant by name, know what they like to eat, and notice when
            someone is quieter than usual. That is often the first sign something has changed.
          </InfoCard>
          <InfoCard title="Families stay informed" accent="green">
            You get a recap at pickup, not a form letter at the end of the month. If something
            comes up during the day, we call.
          </InfoCard>
        </div>
      </Section>

      <Section eyebrow="Our team" title="Who takes care of your loved one" accent="green">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <p className="text-lg leading-relaxed text-ink-soft">
              Our staff is trained in adult care, first aid and CPR, and supervised by licensed
              personnel. More importantly, they are people from this community who genuinely like
              spending the day with seniors.
            </p>
            <CheckList
              accent="teal"
              items={[
                "Trained care staff on site throughout operating hours",
                "Licensed and certified by the State of Texas",
                "Bilingual in English and Spanish",
                "First aid and CPR certified",
                "Background-checked before hire",
                "Ongoing training in dementia and mobility support",
              ]}
            />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <PhotoPlaceholder accent="teal" aspect="aspect-[3/4]" label="Staff portrait: center director" />
            <PhotoPlaceholder accent="green" aspect="aspect-[3/4]" label="Staff portrait: activities coordinator" />
            <PhotoPlaceholder accent="marigold" aspect="aspect-[3/4]" label="Staff portrait: care attendant" />
            <PhotoPlaceholder accent="pink" aspect="aspect-[3/4]" label="Staff portrait: kitchen lead" />
          </div>
        </div>
      </Section>

      <Section tinted eyebrow="Our center" title="The space itself" accent="teal">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <PhotoPlaceholder
            accent="pink"
            src={photos.activityRoom}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            label="The main activity room with tables and seating"
          />
          <PhotoPlaceholder
            accent="marigold"
            src={photos.kitchenPrep}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            label="Kitchen staff preparing fresh fruit for the day's meals"
          />
          <PhotoPlaceholder
            accent="teal"
            src={photos.quietRoom}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            label="The quiet room, with beds made up for rest during the day"
          />
          <PhotoPlaceholder
            accent="green"
            src={photos.outdoorSeating}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            label="The shaded outdoor seating area"
          />
          <PhotoPlaceholder
            accent="pink"
            src={photos.lounge}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            label="The front lounge, where families wait and participants relax between activities"
          />
          <PhotoPlaceholder
            accent="marigold"
            src={photos.transportVan}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            label="A staff member helping a participant board the center's transport van"
          />
        </div>
      </Section>

      <Section eyebrow="Find us" title="Visit the center" accent="pink">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 rounded-[--radius-card] border border-line bg-white p-8 text-center shadow-sm">
          <address className="not-italic text-xl font-extrabold leading-relaxed text-ink">
            {fullAddress}
          </address>
          <p className="text-lg text-ink-soft">{site.hours.label}</p>
          <a href={site.phoneHref} className="text-2xl font-extrabold text-pink-deep hover:underline">
            {site.phone}
          </a>
          <p className="text-base text-ink-mute">
            Walk-ins welcome during operating hours, though calling ahead means someone can give
            you a proper tour.
          </p>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
