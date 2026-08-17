import Link from "next/link";
import { CallButton } from "@/components/ui";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center gap-5 px-5 py-24 text-center">
      <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-pink-deep">Page not found</p>
      <h1 className="text-balance text-4xl font-extrabold tracking-tight text-ink">
        We could not find that page
      </h1>
      <p className="text-lg leading-relaxed text-ink-soft">
        It may have moved. Try the home page, or call us. We are happy to answer anything you
        were looking for.
      </p>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <CallButton />
        <Link
          href="/"
          prefetch={false}
          className="inline-flex items-center justify-center rounded-full border-2 border-line-strong bg-white px-7 py-3.5 text-base font-extrabold text-ink transition hover:border-pink hover:text-pink-deep"
        >
          Back Home
        </Link>
      </div>
      <p className="text-sm text-ink-mute">{site.hours.label}</p>
    </section>
  );
}
