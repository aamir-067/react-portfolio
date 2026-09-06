import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Manrope } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/chrome/Cursor";
import Hud from "@/components/chrome/Hud";
import Footer from "@/components/chrome/Footer";
import Grain from "@/components/chrome/Grain";
import GridLines from "@/components/chrome/GridLines";
import Preloader from "@/components/chrome/Preloader";
import ScrollFX from "@/components/chrome/ScrollFX";
import SmoothScroll from "@/components/providers/SmoothScroll";
import TransitionProvider from "@/components/providers/TransitionProvider";
import { site } from "@/content";
import { themeBootScript } from "@/lib/theme";

const sans = Manrope({
	subsets: ["latin"],
	variable: "--font-sans",
	display: "swap",
});

const mono = IBM_Plex_Mono({
	weight: ["400", "500"],
	subsets: ["latin"],
	variable: "--font-mono",
	display: "swap",
});

const pageTitle = `${site.shortName} · Sr. Fullstack AI Engineer`;

export const metadata: Metadata = {
	metadataBase: new URL(site.url),
	title: {
		default: pageTitle,
		template: `%s · ${site.shortName}`,
	},
	description: site.description,
	applicationName: site.shortName,
	authors: [{ name: site.name, url: site.url }],
	creator: site.name,
	publisher: site.name,
	keywords: [
		"Aamir Khan",
		"Muhammad Aamir Khan",
		"Sr. Fullstack AI Engineer",
		"AI Engineer",
		"Fullstack Engineer",
		"AI agents",
		"RAG",
		"Retrieval Augmented Generation",
		"LangChain",
		"Next.js",
		"React Native",
		"Peshawar",
		"Pakistan",
	],
	openGraph: {
		title: pageTitle,
		description: site.description,
		url: site.url,
		siteName: site.shortName,
		images: [
			{
				url: "/og.png",
				width: 1200,
				height: 630,
				alt: `${site.name}, ${site.role}`,
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: pageTitle,
		description: site.description,
		images: ["/og.png"],
		creator: "@A_a_M_i_R_",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: dark)", color: "#0F1111" },
		{ media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
	],
};

const jsonLdPerson = {
	"@context": "https://schema.org",
	"@type": "Person",
	"@id": `${site.url}/#person`,
	name: site.name,
	jobTitle: "Sr. Fullstack AI Engineer",
	description: site.description,
	url: site.url,
	image: `${site.url}/profile.webp`,
	email: `mailto:${site.email}`,
	address: {
		"@type": "PostalAddress",
		addressLocality: "Peshawar",
		addressCountry: "PK",
	},
	worksFor: { "@type": "Organization", name: "Metasense Technologies" },
	alumniOf: {
		"@type": "CollegeOrUniversity",
		name: "UST Bannu, KPK, Pakistan",
	},
	sameAs: [site.linkedin, site.github],
	knowsAbout: [
		"AI Agents",
		"Retrieval Augmented Generation",
		"LLM Orchestration",
		"Fullstack Engineering",
		"Realtime Systems",
		"React Native",
		"Next.js",
	],
};

const jsonLdWebsite = {
	"@context": "https://schema.org",
	"@type": "WebSite",
	"@id": `${site.url}/#website`,
	url: site.url,
	name: `${site.name}, Sr. Fullstack AI Engineer`,
	description: site.description,
	publisher: { "@id": `${site.url}/#person` },
};

const jsonLdProfilePage = {
	"@context": "https://schema.org",
	"@type": "ProfilePage",
	"@id": `${site.url}/#webpage`,
	url: site.url,
	name: pageTitle,
	isPartOf: { "@id": `${site.url}/#website` },
	about: { "@id": `${site.url}/#person` },
	mainEntity: { "@id": `${site.url}/#person` },
	inLanguage: "en",
};

// Flags a fresh session before first paint so the boot veil can render
// without a flash of page content underneath.
const bootScript = `(function(){try{if(!sessionStorage.getItem("aamir-boot")){document.documentElement.setAttribute("data-boot","")}}catch(e){}})()`;

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
			<head>
				<script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
				<script dangerouslySetInnerHTML={{ __html: bootScript }} />
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
				/>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
				/>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(jsonLdProfilePage),
					}}
				/>
			</head>
			<body>
				<a href="#main" className="skip-link">
					Skip to content
				</a>
				<SmoothScroll />
				<TransitionProvider>
					<Hud />
					<main id="main">{children}</main>
					<Footer />
				</TransitionProvider>
				<GridLines />
				<ScrollFX />
				<Cursor />
				<Grain />
				<Preloader />
			</body>
		</html>
	);
}
