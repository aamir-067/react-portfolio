import type { Metadata } from 'next';
import '../index.css';
import ClientLayout from './ClientLayout';

const siteUrl = 'https://aamir.zoviotech.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Muhammad Aamir Khan | Founder & CEO of Zoviotech",
  description: "Muhammad Aamir Khan is the Founder and CEO of Zoviotech, a technology company specializing in AI automation, business process automation, custom AI agents, and SaaS product engineering.",
  applicationName: "Muhammad Aamir Khan - Zoviotech",
  authors: [{ name: "Muhammad Aamir Khan", url: siteUrl }],
  creator: "Muhammad Aamir Khan",
  publisher: "Zoviotech",
  generator: "Next.js",
  keywords: [
    "Muhammad Aamir Khan",
    "Zoviotech",
    "Zovio Technologies",
    "Founder CEO",
    "Tech Entrepreneur",
    "AI Automation",
    "AI Consulting",
    "Business Process Automation",
    "Custom AI Agents",
    "AI Solutions",
    "SaaS Development",
    "SaaS Product Engineering",
    "Digital Transformation",
    "AI for Business",
    "Enterprise AI",
    "Startup AI Consulting",
    "AI Strategy",
    "Automation Solutions",
    "AI Innovation",
    "Technology Leadership"
  ],
  openGraph: {
    title: "Muhammad Aamir Khan | Founder & CEO of Zoviotech",
    description: "Muhammad Aamir Khan is the Founder and CEO of Zoviotech. We build AI-powered automation solutions that help businesses scale efficiently.",
    url: siteUrl,
    siteName: "Muhammad Aamir Khan",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Muhammad Aamir Khan - Founder & CEO of Zoviotech"
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Aamir Khan | Founder & CEO of Zoviotech",
    description: "Building AI-powered automation solutions at Zoviotech. Tech entrepreneur focused on AI agents, automation, and SaaS.",
    images: ["/og-image.png"],
    creator: "@A_a_M_i_R_",
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteUrl}/#person`,
  "name": "Muhammad Aamir Khan",
  "jobTitle": "Founder & CEO",
  "description": "Muhammad Aamir Khan is the Founder and CEO of Zoviotech, a technology company specializing in AI automation and SaaS product engineering.",
  "url": siteUrl,
  "image": `${siteUrl}/profile_white.png`,
  "sameAs": [
    "https://www.linkedin.com/in/i-aamir-khan",
    "https://github.com/aamir-067",
    "https://zoviotech.com"
  ],
  "worksFor": {
    "@type": "Organization",
    "@id": "https://zoviotech.com/#organization"
  },
  "knowsAbout": [
    "AI Automation",
    "Business Process Automation",
    "Custom AI Agents",
    "SaaS Product Engineering",
    "Digital Transformation",
    "AI Consulting",
    "Technology Leadership"
  ]
};

const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://zoviotech.com/#organization",
  "name": "Zoviotech",
  "alternateName": "Zovio Technologies",
  "url": "https://zoviotech.com",
  "logo": "https://zoviotech.com/logo.png",
  "description": "Zoviotech is a technology company that builds AI-powered automation solutions, custom AI agents, and SaaS products for businesses.",
  "founder": {
    "@type": "Person",
    "@id": `${siteUrl}/#person`
  },
  "sameAs": [
    "https://www.linkedin.com/company/zoviotech",
    "https://zoviotech.com"
  ]
};

const jsonLdWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  "url": siteUrl,
  "name": "Muhammad Aamir Khan - Founder & CEO of Zoviotech",
  "description": "Personal website of Muhammad Aamir Khan, Founder and CEO of Zoviotech.",
  "publisher": {
    "@type": "Person",
    "@id": `${siteUrl}/#person`
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
