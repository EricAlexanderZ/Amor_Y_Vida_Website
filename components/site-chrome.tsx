import Link from "next/link";
import Image from "next/image";
import { site, fullAddress, serviceAreas } from "@/lib/site";

const NAV = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/activities", label: "Activities" },
  { href: "/gallery", label: "Photos" },
  { href: "/videos", label: "Videos" },
  { href: "/eligibility", label: "Who Qualifies" },
  { href: "/insurance", label: "Insurance" },
  { href: "/contact", label: "Contact" },
];

function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 1.9.6 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.1a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.8.6a2 2 0 0 1 1.7 2Z" />
    </svg>
  );
}

/* ── Top bar + header ───────────────────────────────────────────────────── */

export function SiteHeader() {
  return (
    <>
      {/* Contact strip. NAP in the markup on every page is deliberate. It is
          one of the strongest local-search signals a site can give. */}
      <div className="bg-pink text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-1 px-4 py-2 text-center text-[13px] font-semibold sm:justify-between">
          <a href={site.phoneHref} className="inline-flex min-h-9 items-center gap-1.5 hover:underline">
            <PhoneIcon className="h-3.5 w-3.5" />
            {site.phone}
          </a>
          <span className="hidden sm:inline">{site.hours.short}</span>
          <span className="hidden lg:inline">{fullAddress}</span>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur-0">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
          <Link href="/" prefetch={false} className="flex shrink-0 items-center gap-3" aria-label={`${site.shortName} home`}>
            <Image src="/images/logo.png" alt="" width={54} height={54} priority className="h-12 w-12 object-contain sm:h-14 sm:w-14" />
            <span className="flex flex-col leading-none">
              <span className="text-lg font-extrabold tracking-tight text-pink-deep sm:text-xl">Amor Y Vida</span>
              <span className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-marigold-deep">Adult Day Care</span>
            </span>
          </Link>

          <nav aria-label="Primary" className="ml-auto hidden items-center gap-1 xl:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                className="inline-flex min-h-11 items-center rounded-full px-3 py-2 text-[15px] font-bold text-ink-soft transition hover:bg-pink-tint hover:text-pink-deep"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <a
            href={site.phoneHref}
            className="ml-auto inline-flex items-center gap-2 rounded-full bg-pink px-4 py-2.5 text-sm font-extrabold text-white shadow-sm transition hover:bg-pink-deep xl:ml-2"
          >
            <PhoneIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Call Us</span>
            <span className="sm:hidden">Call</span>
          </a>
        </div>

        {/* Small screens: nav wraps below rather than hiding behind a JS drawer.
            Fewer moving parts, and nothing is unreachable if scripts fail. */}
        <nav aria-label="Primary, condensed" className="border-t border-line xl:hidden">
          <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-3 py-2">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                className="inline-flex min-h-11 items-center whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-bold text-ink-soft transition hover:bg-pink-tint hover:text-pink-deep"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>
    </>
  );
}

/* ── Footer ─────────────────────────────────────────────────────────────── */

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-ink text-white/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-white p-1">
              <Image src="/images/logo.png" alt="" width={44} height={44} className="h-10 w-10 object-contain" />
            </span>
            <span className="text-lg font-extrabold text-white">Amor Y Vida</span>
          </div>
          <p className="max-w-xs text-sm leading-relaxed">
            Compassionate, personalized adult day care in La Blanca, serving families
            throughout {site.address.county}. Su familia es nuestra familia.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-extrabold uppercase tracking-widest text-marigold">Explore</h2>
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} prefetch={false} className="inline-flex min-h-9 items-center text-sm hover:text-white hover:underline">
              {item.label}
            </Link>
          ))}
          <Link href="/admissions" prefetch={false} className="inline-flex min-h-9 items-center text-sm hover:text-white hover:underline">How to Enroll</Link>
          <Link href="/faq" prefetch={false} className="inline-flex min-h-9 items-center text-sm hover:text-white hover:underline">FAQ</Link>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-extrabold uppercase tracking-widest text-marigold">Areas We Serve</h2>
          <div className="flex flex-wrap gap-x-3 gap-y-1.5">
            {serviceAreas.map((area) => (
              <Link key={area.slug} href={`/areas-we-serve/${area.slug}`} prefetch={false} className="inline-flex min-h-9 items-center text-sm hover:text-white hover:underline">
                {area.city}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-extrabold uppercase tracking-widest text-marigold">Visit Us</h2>
          <address className="not-italic text-sm leading-relaxed">
            {site.address.street}
            <br />
            {site.address.city}, {site.address.state} {site.address.zip}
          </address>
          <a href={site.phoneHref} className="text-sm font-bold text-white hover:underline">{site.phone}</a>
          <p className="text-sm">{site.hours.label}</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-5 py-5 text-center text-xs sm:flex-row sm:justify-between sm:text-left">
          <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <span className="hidden lg:inline">Licensed adult day care · {site.address.county}, Texas</span>

          {/* Agency credit. External, so a plain anchor rather than next/link. */}
          <a
            href="https://turbosites.io"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-4 py-2 transition hover:border-white/40 hover:bg-white/5"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-marigold transition group-hover:text-white">
              <path fill="currentColor" d="M13.5 2 4 13.2h6.1L9.4 22 20 10.4h-6.4z" />
            </svg>
            <span className="whitespace-nowrap text-white/55 transition group-hover:text-white/80">Site by</span>
            <span className="whitespace-nowrap font-extrabold text-white transition group-hover:text-marigold">
              TurboSites.io
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
