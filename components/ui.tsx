import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";

type Accent = "pink" | "marigold" | "teal" | "green";

const ACCENT: Record<Accent, { tint: string; deep: string; solid: string; ring: string }> = {
  pink:     { tint: "bg-pink-tint",     deep: "text-pink-deep",     solid: "bg-pink",     ring: "ring-pink/25" },
  marigold: { tint: "bg-marigold-tint", deep: "text-marigold-deep", solid: "bg-marigold", ring: "ring-marigold/25" },
  teal:     { tint: "bg-teal-tint",     deep: "text-teal-deep",     solid: "bg-teal",     ring: "ring-teal/25" },
  green:    { tint: "bg-leaf-tint",     deep: "text-leaf-deep",     solid: "bg-leaf",     ring: "ring-leaf/25" },
};

/* ── Page furniture ─────────────────────────────────────────────────────── */

export function PageHero({
  eyebrow,
  title,
  lede,
  accent = "pink",
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  accent?: Accent;
}) {
  const a = ACCENT[accent];
  return (
    <section className={`${a.tint} border-b border-line`}>
      <div className="mx-auto max-w-4xl px-5 py-14 text-center sm:py-20">
        <p className={`text-xs font-extrabold uppercase tracking-[0.2em] ${a.deep}`}>{eyebrow}</p>
        <h1 className="mt-4 text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-5xl">
          {title}
        </h1>
        {lede && <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-ink-soft">{lede}</p>}
      </div>
    </section>
  );
}

export function Section({
  eyebrow,
  title,
  lede,
  accent = "pink",
  children,
  tinted = false,
  id,
}: {
  eyebrow?: string;
  title?: string;
  lede?: string;
  accent?: Accent;
  children: React.ReactNode;
  tinted?: boolean;
  id?: string;
}) {
  const a = ACCENT[accent];
  return (
    <section id={id} className={tinted ? "bg-cream" : undefined}>
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 py-16 sm:py-20">
        {(eyebrow || title) && (
          <header className="flex flex-col gap-3 text-center">
            {eyebrow && <p className={`text-xs font-extrabold uppercase tracking-[0.2em] ${a.deep}`}>{eyebrow}</p>}
            {title && <h2 className="text-balance text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{title}</h2>}
            {lede && <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-ink-soft">{lede}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}

/* ── Buttons ────────────────────────────────────────────────────────────── */

export function CallButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={site.phoneHref}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-pink px-7 py-3.5 text-base font-extrabold text-white shadow-sm transition hover:bg-pink-deep ${className}`}
    >
      Call {site.phone}
    </a>
  );
}

export function GhostLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      prefetch={false}
      className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-line-strong bg-white px-7 py-3.5 text-base font-extrabold text-ink transition hover:border-pink hover:text-pink-deep"
    >
      {children}
    </Link>
  );
}

/* ── Media placeholders ─────────────────────────────────────────────────────
   These are intentionally designed, not grey boxes. Each one names the shot it
   is waiting for, so the client knows exactly what to send, and so the page
   still looks finished during the review before any photos exist.
   ────────────────────────────────────────────────────────────────────────── */

function CameraIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

function PlayIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M8 5.5v13l11-6.5z" />
    </svg>
  );
}

/**
 * A photo slot.
 *
 * With `src` it renders the real photograph; without one it keeps the dashed
 * "photo coming soon" box that names the shot still needed. Both states are the
 * same component on purpose — a photo appears the moment its file lands and its
 * `src` is filled in, and the page needs no other change. `label` doubles as the
 * alt text, so every image is described whether or not it exists yet.
 *
 * `priority` is for above-the-fold images only (realistically just the home
 * hero); everything else stays lazy so a gallery page does not fetch 8 photos
 * the visitor may never scroll to.
 */
export function PhotoPlaceholder({
  label,
  src,
  accent = "pink",
  aspect = "aspect-[4/3]",
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  priority = false,
}: {
  label: string;
  src?: string;
  accent?: Accent;
  aspect?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const a = ACCENT[accent];

  if (src) {
    return (
      <figure className={`relative ${aspect} w-full overflow-hidden rounded-[--radius-card] border border-line bg-line/20`}>
        <Image
          src={src}
          alt={label}
          fill
          // Always declare sizes with `fill`, or Next assumes 100vw and ships a
          // far larger file than the box ever displays.
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </figure>
    );
  }

  return (
    <figure
      className={`group relative flex ${aspect} w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-[--radius-card] border-2 border-dashed border-line-strong ${a.tint} p-5 text-center`}
    >
      <span className={`grid h-12 w-12 place-items-center rounded-full ${a.solid} text-white shadow-sm`}>
        <CameraIcon className="h-6 w-6" />
      </span>
      <figcaption className="flex flex-col gap-1">
        <span className={`text-[11px] font-extrabold uppercase tracking-[0.16em] ${a.deep}`}>Photo coming soon</span>
        <span className="text-sm font-bold leading-snug text-ink-soft">{label}</span>
      </figcaption>
    </figure>
  );
}

export function VideoPlaceholder({
  title,
  duration,
  blurb,
  accent = "teal",
}: {
  title: string;
  duration: string;
  blurb: string;
  accent?: Accent;
}) {
  const a = ACCENT[accent];
  return (
    <article className="flex flex-col overflow-hidden rounded-[--radius-card] border border-line bg-white shadow-sm">
      <div className={`relative flex aspect-video items-center justify-center ${a.tint} border-b-2 border-dashed border-line-strong`}>
        <span className={`grid h-16 w-16 place-items-center rounded-full ${a.solid} pl-1 text-white shadow-md`}>
          <PlayIcon className="h-7 w-7" />
        </span>
        <span className="absolute bottom-3 right-3 rounded-md bg-ink/80 px-2 py-1 text-[11px] font-bold tabular-nums text-white">
          {duration}
        </span>
      </div>
      <div className="flex flex-col gap-1.5 p-5">
        <span className={`text-[11px] font-extrabold uppercase tracking-[0.16em] ${a.deep}`}>Video coming soon</span>
        <h3 className="text-lg font-extrabold leading-snug text-ink">{title}</h3>
        <p className="text-sm leading-relaxed text-ink-soft">{blurb}</p>
      </div>
    </article>
  );
}

/* ── Cards ──────────────────────────────────────────────────────────────── */

export function InfoCard({
  title,
  children,
  accent = "pink",
}: {
  title: string;
  children: React.ReactNode;
  accent?: Accent;
}) {
  const a = ACCENT[accent];
  return (
    <article className="flex flex-col gap-3 rounded-[--radius-card] border border-line bg-white p-6 shadow-sm">
      <span className={`h-1.5 w-12 rounded-full ${a.solid}`} />
      <h3 className="text-xl font-extrabold leading-snug text-ink">{title}</h3>
      <div className="text-[15px] leading-relaxed text-ink-soft">{children}</div>
    </article>
  );
}

export function CheckList({ items, accent = "green" }: { items: readonly string[]; accent?: Accent }) {
  const a = ACCENT[accent];
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full ${a.solid} text-white`}>
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </span>
          <span className="text-[15px] leading-relaxed text-ink-soft">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* ── Closing call to action, repeated at the end of every page ──────────── */

export function CtaBand({
  title = "Come see the center for yourself",
  body = "Tours are free and take about twenty minutes. Meet the staff, see the space, and we will walk you through insurance and eligibility, with no obligation.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="bg-ink">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-5 py-16 text-center sm:py-20">
        <h2 className="text-balance text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{title}</h2>
        <p className="max-w-2xl text-pretty text-lg leading-relaxed text-white/75">{body}</p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <CallButton />
          <Link
            href="/contact"
            prefetch={false}
            className="inline-flex items-center justify-center rounded-full border-2 border-white/30 px-7 py-3.5 text-base font-extrabold text-white transition hover:border-white"
          >
            Schedule a Tour
          </Link>
        </div>
        <p className="text-sm text-white/60">{site.hours.label} · Se habla español</p>
      </div>
    </section>
  );
}
