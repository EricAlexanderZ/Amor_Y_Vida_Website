"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

/**
 * The small-screen menu.
 *
 * This replaced a horizontally scrolling strip of pills. That strip technically
 * held every link, but the last two sat off the right edge with no affordance
 * saying so, which meant Insurance and Contact were effectively invisible on a
 * phone. Contact in particular is the whole point of the site.
 *
 * Letting the strip wrap instead was the other option and is worse: the nav
 * lives inside a sticky header, so three wrapped rows would permanently occupy
 * roughly a third of a phone screen.
 *
 * The panel is absolutely positioned rather than in flow, so opening it does
 * not change the height of the sticky header and shove the page down.
 */
export function MobileNav({ items }: { items: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on navigation. App Router does client-side transitions, so without
  // this the menu would still be sitting open on the page you just opened.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus(); // don't strand focus on a hidden panel
      }
    };
    const onPointer = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !buttonRef.current?.contains(t)) setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div className="relative xl:hidden">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close menu" : "Open menu"}
        className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full border border-line px-3 text-sm font-extrabold text-ink-soft transition hover:bg-pink-tint hover:text-pink-deep"
      >
        {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        <span className="hidden sm:inline">{open ? "Close" : "Menu"}</span>
      </button>

      {open && (
        <div
          ref={panelRef}
          id="mobile-nav-panel"
          className="absolute right-0 top-[calc(100%+0.6rem)] z-50 max-h-[70vh] w-64 overflow-y-auto overscroll-contain rounded-[--radius-card] border border-line bg-white p-2 shadow-xl"
        >
          <nav aria-label="Primary" className="flex flex-col">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                onClick={() => setOpen(false)}
                aria-current={pathname === item.href ? "page" : undefined}
                className={`inline-flex min-h-11 items-center rounded-xl px-3 text-[15px] font-bold transition hover:bg-pink-tint hover:text-pink-deep ${
                  pathname === item.href ? "bg-pink-tint text-pink-deep" : "text-ink-soft"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}

function MenuIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
