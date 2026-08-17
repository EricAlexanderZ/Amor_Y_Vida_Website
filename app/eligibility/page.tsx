import type { Metadata } from "next";
import { PageHero, Section, CheckList, InfoCard, PhotoPlaceholder, CtaBand, CallButton } from "@/components/ui";
import { eligibilityCriteria, site } from "@/lib/site";
import { photos } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Who Qualifies",
  description:
    "Find out if your loved one qualifies for adult day care at Amor Y Vida in La Blanca, TX. Medicaid, STAR+PLUS, Medicare and private insurance accepted across Hidalgo County.",
  alternates: { canonical: "/eligibility" },
};

export default function EligibilityPage() {
  return (
    <>
      <PageHero
        eyebrow="Do you qualify?"
        accent="green"
        title="Most families qualify, and most pay nothing"
        lede="Eligibility is usually simpler than people expect. If your loved one needs supervision during the day, there is a good chance a plan already covers it."
      />

      <Section eyebrow="The basics" title="You may qualify if any of these apply" accent="green">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <CheckList items={eligibilityCriteria} accent="green" />
          <PhotoPlaceholder
            accent="green"
            aspect="aspect-[4/3]"
            src={photos.staffAssist}
            sizes="(min-width: 1024px) 50vw, 100vw"
            label="A staff member sitting with a participant to help her through the day"
          />
        </div>
      </Section>

      <Section tinted eyebrow="What it costs" title="Cost, in plain terms" accent="pink">
        <div className="grid gap-6 md:grid-cols-3">
          <InfoCard title="Covered by Medicaid" accent="green">
            Texas Medicaid managed care, including STAR+PLUS, covers adult day care for members
            who meet the level-of-care requirement. For these families the cost is $0.
          </InfoCard>
          <InfoCard title="Private insurance" accent="teal">
            Several private and long-term care plans cover day services in full or in part. We
            verify your specific plan before you enroll.
          </InfoCard>
          <InfoCard title="Private pay" accent="marigold">
            If no plan applies, we offer a straightforward daily rate with no contract and no
            minimum number of days. Call for current pricing.
          </InfoCard>
        </div>
        <p className="mx-auto max-w-2xl text-center text-lg leading-relaxed text-ink-soft">
          We will not guess at your coverage. Call with the name of the plan and the member ID,
          and we will check it and tell you exactly what applies.
        </p>
        <div className="flex justify-center">
          <CallButton />
        </div>
      </Section>

      <Section eyebrow="Common situations" title="Where families usually land" accent="teal">
        <div className="grid gap-6 md:grid-cols-2">
          <InfoCard title="A parent who should not be home alone" accent="pink">
            The most common case we see. A parent is still independent enough to live at home, but
            not safe unsupervised for eight hours while adult children work.
          </InfoCard>
          <InfoCard title="Recovering after a hospital stay" accent="teal">
            Adults who have been discharged but are not yet back to full strength. Daytime
            monitoring bridges the gap and often prevents a readmission.
          </InfoCard>
          <InfoCard title="Early or moderate memory loss" accent="marigold">
            Predictable routine, familiar faces and structured activity are genuinely protective.
            We are equipped for early to moderate dementia.
          </InfoCard>
          <InfoCard title="Caregiver burnout" accent="green">
            A spouse or daughter providing round-the-clock care who needs the day back. This is a
            legitimate reason to enroll, and nobody should feel guilty about it.
          </InfoCard>
        </div>
      </Section>

      <Section tinted eyebrow="Not sure?" title="One phone call settles it" accent="pink">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <p className="text-lg leading-relaxed text-ink-soft">
            Describe the situation and we will tell you honestly whether adult day care fits. If
            your loved one needs more care than we provide, we will say so and point you toward
            the right kind of provider.
          </p>
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
