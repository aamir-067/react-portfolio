import type { Metadata, Viewport } from "next";
import {
	IBM_Plex_Mono,
	Instrument_Sans,
	Instrument_Serif,
} from "next/font/google";
import "./globals.css";
import Header from "@/components/chrome/Header";
import Footer from "@/components/chrome/Footer";
import Cursor from "@/components/chrome/Cursor";
import Grain from "@/components/chrome/Grain";
import Preloader from "@/components/chrome/Preloader";
import ScrollFX from "@/components/chrome/ScrollFX";
import SmoothScroll from "@/components/providers/SmoothScroll";
import TransitionProvider from "@/components/providers/TransitionProvider";
import { site } from "@/content";

const serif = Instrument_Serif({
	weight: "400",
	style: ["normal", "italic"],
	subsets: ["latin"],
	variable: "--font-serif",
	display: "swap",
});

const sans = Instrument_Sans({
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
		// TODO: swap to a designed 1200x630 OG image (see IMAGES.md)
		images: [
			{ url: "/profile_white.png", width: 1200, height: 630, alt: site.name },
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: pageTitle,
		description: site.description,
		images: ["/profile_white.png"],
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
	themeColor: "#f2efe8",
};

const jsonLdPerson = {
	"@context": "https://schema.org",
	"@type": "Person",
	"@id": `${site.url}/#person`,
	name: site.name,
	jobTitle: "Sr. Fullstack AI Engineer",
	description: site.description,
	url: site.url,
	email: `mailto:${site.email}`,
	address: {
		"@type": "PostalAddress",
		addressLocality: "Peshawar",
		addressCountry: "PK",
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

// Flags a fresh session before first paint so the boot veil can render
// without a flash of page content underneath.
const bootScript = `(function(){try{if(!sessionStorage.getItem("aamir-boot")){document.documentElement.setAttribute("data-boot","")}}catch(e){}})()`;

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			className={`${serif.variable} ${sans.variable} ${mono.variable}`}
		>
			<head>
				<script dangerouslySetInnerHTML={{ __html: bootScript }} />
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
				/>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
				/>
			</head>
			<body>
				<a href="#main" className="skip-link">
					Skip to content
				</a>
				<SmoothScroll />
				<TransitionProvider>
					<Header />
					<main id="main">{children}</main>
					<Footer />
				</TransitionProvider>
				<ScrollFX />
				<Cursor />
				<Grain />
				<Preloader />
			</body>
		</html>
	);
}
