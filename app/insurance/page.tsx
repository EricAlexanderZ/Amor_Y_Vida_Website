import type { Metadata } from "next";
import { PageHero, Section, InfoCard, CtaBand, CallButton } from "@/components/ui";
import { insurers, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Accepted Insurance Plans",
  description:
    "Amor Y Vida Adult Day Care Center accepts United Healthcare, Superior HealthPlan, Driscoll Health Plan, Molina and Texas Medicaid STAR+PLUS. Serving La Blanca and Hidalgo County, TX.",
  alternates: { canonical: "/insurance" },
};

export default function InsurancePage() {
  return (
    <>
      <PageHero
        eyebrow="We work with your plan"
        accent="teal"
        title="Accepted insurance plans"
        lede="Cost should never be the reason a family goes without help. We accept a range of Medicaid managed care and private plans."
      />

      <Section eyebrow="Plans we accept" title="Recognize your card?" accent="teal">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {insurers.map((i) => (
            <li
              key={i.name}
              className="flex min-h-[120px] items-center justify-center rounded-[--radius-card] border border-line bg-white px-6 py-8 text-center text-lg font-extrabold text-ink shadow-sm"
            >
              {i.name}
            </li>
          ))}
        </ul>
        <p className="mx-auto max-w-2xl text-center text-lg leading-relaxed text-ink-soft">
          This list changes as plans update their networks. If yours is not shown, call anyway.
          We check individual plans regularly and may already be in network.
        </p>
        <div className="flex justify-center">
          <CallButton />
        </div>
      </Section>

      <Section tinted eyebrow="How coverage works" title="What to expect on the phone" accent="pink">
        <div className="grid gap-6 md:grid-cols-3">
          <InfoCard title="1. Tell us your plan" accent="pink">
            Have the insurance card handy. We need the plan name and the member ID, and that is
            usually enough to check eligibility.
          </InfoCard>
          <InfoCard title="2. We verify it" accent="teal">
            We contact the plan directly rather than asking you to navigate a phone tree. Most
            verifications come back within a day or two.
          </InfoCard>
          <InfoCard title="3. You get a straight answer" accent="green">
            Covered, partly covered, or not covered, and what that means in dollars. No enrolling
            first and finding out later.
          </InfoCard>
        </div>
      </Section>

      <Section eyebrow="Medicaid & STAR+PLUS" title="If your loved one has Texas Medicaid" accent="green">
        <div className="mx-auto flex max-w-3xl flex-col gap-5">
          <p className="text-lg leading-relaxed text-ink-soft">
            Texas Medicaid managed care covers adult day services for members who meet the
            level-of-care requirement. In the Valley this usually means a STAR+PLUS plan through
            one of the managed care organizations we work with.
          </p>
          <p className="text-lg leading-relaxed text-ink-soft">
            If your loved one has Medicaid but you have never heard the phrase &ldquo;adult day
            care benefit&rdquo;, that is common. Many families do not learn the benefit exists
            until someone tells them. Call us and we will explain what applies to your situation.
          </p>
          <p className="text-lg leading-relaxed text-ink-soft">
            Not yet on Medicaid? We can point you toward the right starting place for an
            application, though we cannot file it on your behalf.
          </p>
        </div>
      </Section>

      <CtaBand
        title="Let us check your coverage"
        body={`Call ${site.phone} with the plan name and member ID. Verification is free and there is no obligation to enroll.`}
      />
    </>
  );
}
