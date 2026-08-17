import type { Metadata } from "next";
import { PageHero, Section, InfoCard, CheckList, CtaBand, CallButton } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "How to Enroll",
  description:
    "Enrolling at Amor Y Vida Adult Day Care Center in La Blanca, TX takes about a week. Free tour, insurance verification and a personalized care plan. Call (956) 270-4637.",
  alternates: { canonical: "/admissions" },
};

const STEPS = [
  {
    title: "Call us",
    body: "Tell us about your loved one: age, health conditions, mobility, and what a typical day looks like now. Fifteen minutes on the phone tells us both whether this is a fit.",
  },
  {
    title: "Take a tour",
    body: "Come see the center during operating hours, ideally while an activity is running. Bring your loved one if they are up to it; the reaction to the room tells you a lot.",
  },
  {
    title: "We verify insurance",
    body: "Give us the plan name and member ID and we handle the verification. You will get a clear answer on coverage before committing to anything.",
  },
  {
    title: "Paperwork and physician form",
    body: "Standard enrollment forms plus a short form your loved one's doctor signs confirming they are appropriate for day services. We will tell you exactly what is needed.",
  },
  {
    title: "Build the care plan",
    body: "We sit down and document medications, dietary needs, mobility support, allergies, and the things that matter: favorite music, what upsets them, who to call first.",
  },
  {
    title: "First day",
    body: "Most participants start part-time for the first week. Staff check in with you at pickup each day until everyone has settled.",
  },
];

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Getting started"
        accent="marigold"
        title="Enrolling takes about a week"
        lede="Six steps, most of which we handle. Here is exactly what happens between your first phone call and your loved one's first day."
      />

      <Section eyebrow="The process" title="Step by step" accent="pink">
        <ol className="mx-auto flex w-full max-w-3xl flex-col gap-0">
          {STEPS.map((step, i) => (
            <li key={step.title} className="flex gap-5">
              <div className="flex flex-col items-center">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-pink text-base font-extrabold tabular-nums text-white">
                  {i + 1}
                </span>
                {i < STEPS.length - 1 && <span className="w-0.5 flex-1 bg-line-strong" />}
              </div>
              <div className="flex flex-col gap-1.5 pb-9">
                <h2 className="text-xl font-extrabold leading-snug text-ink">{step.title}</h2>
                <p className="text-[15px] leading-relaxed text-ink-soft">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section tinted eyebrow="Come prepared" title="What to bring to the tour" accent="teal">
        <div className="mx-auto grid w-full max-w-4xl gap-10 lg:grid-cols-2">
          <CheckList
            accent="teal"
            items={[
              "Insurance card (or a photo of the front and back)",
              "A current list of medications and doses",
              "Your loved one's doctor's name and phone number",
              "Any mobility equipment normally used: walker, cane, wheelchair",
              "Notes on dietary restrictions or allergies",
              "Emergency contact names and numbers",
            ]}
          />
          <div className="flex flex-col gap-5">
            <InfoCard title="You do not need all of it to visit" accent="marigold">
              Show up with nothing and we will still give you the full tour. The list above just
              means fewer follow-up phone calls later.
            </InfoCard>
            <InfoCard title="Bring a second set of ears" accent="green">
              Families take in more when two people visit. Bring a sibling or a spouse, because the
              questions they ask are usually the ones you forgot.
            </InfoCard>
          </div>
        </div>
      </Section>

      <Section eyebrow="Questions we hear" title="Two things families worry about" accent="green">
        <div className="mx-auto grid w-full max-w-4xl gap-6 md:grid-cols-2">
          <InfoCard title="&ldquo;What if they refuse to go?&rdquo;" accent="pink">
            Common, and usually temporary. Most participants resist the idea and then settle within
            a week or two once they have made a friend. We start people part-time for exactly this
            reason, and we will work with you on the transition.
          </InfoCard>
          <InfoCard title="&ldquo;Are we giving up on them?&rdquo;" accent="teal">
            The opposite. Adult day care is what allows someone to keep living at home instead of
            moving into a facility. Families who enroll early tend to keep their loved one at home
            considerably longer.
          </InfoCard>
        </div>
      </Section>

      <Section tinted>
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink">Ready to start?</h2>
          <p className="text-lg leading-relaxed text-ink-soft">
            Call and we will book a tour for a day that works. Mornings are livelier if you want
            to see the center at its busiest.
          </p>
          <CallButton />
          <p className="text-base text-ink-mute">{site.hours.label}</p>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
