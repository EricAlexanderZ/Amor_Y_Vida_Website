import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { site, serviceAreaNames } from "@/lib/site";

// Self-hosted by next/font, so no external font request blocks paint
// and there is no layout shift when the face loads.
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Adult Day Care in La Blanca, TX`,
    // Every page appends the brand, which helps click-through on branded searches.
    template: `%s | ${site.shortName} Adult Day Care`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "adult day care La Blanca TX",
    "adult day care Rio Grande Valley",
    "senior day care Hidalgo County",
    "adult day care near me",
    "bilingual adult day care RGV",
    "Medicaid adult day care Texas",
    "STAR+PLUS adult day care",
    ...serviceAreaNames.map((c) => `adult day care ${c} TX`),
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "es_US",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | Adult Day Care in La Blanca, TX`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Adult Day Care in La Blanca, TX`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: { icon: "/images/logo.png", apple: "/images/logo.png" },
};

/**
 * Explicit viewport. `maximumScale` is deliberately left unset so the browser
 * default of 5 applies: this audience is elderly participants and their adult
 * children, and blocking pinch-zoom on a site about senior care would be a
 * genuine accessibility failure.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#e8175d",
  colorScheme: "light",
};

/**
 * MedicalBusiness is a subtype of LocalBusiness, so this satisfies both the
 * generic local-pack signals and the health-specific ones. `areaServed` is what
 * tells Google we legitimately serve the surrounding RGV cities rather than
 * only the one we sit in.
 */
function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    alternateName: site.shortName,
    description: site.description,
    url: site.url,
    telephone: site.phone,
    // Part of the NAP set Google cross-references against the Business Profile,
    // so it belongs in the structured data alongside the phone, not only in the
    // page copy.
    email: site.email,
    logo: `${site.url}/images/logo.png`,
    image: `${site.url}/images/logo.png`,
    priceRange: "Covered by most Medicaid and private plans",
    currenciesAccepted: "USD",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: "US",
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: site.hours.days.map((d) => `https://schema.org/${d}`),
        opens: site.hours.opens,
        closes: site.hours.closes,
      },
    ],
    areaServed: serviceAreaNames.map((city) => ({
      "@type": "City",
      name: city,
      containedInPlace: { "@type": "AdministrativeArea", name: "Hidalgo County, Texas" },
    })),
    availableLanguage: [
      { "@type": "Language", name: "English" },
      { "@type": "Language", name: "Spanish" },
    ],
    sameAs: [site.social.facebook, site.social.instagram],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={nunito.variable}>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-pink focus:px-5 focus:py-3 focus:font-bold focus:text-white"
        >
          Skip to content
        </a>
        <LocalBusinessJsonLd />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
