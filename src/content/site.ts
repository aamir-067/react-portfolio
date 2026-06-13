export const site = {
	name: "Muhammad Aamir Khan",
	shortName: "Aamir Khan",
	role: "Sr. Fullstack AI Engineer",
	url: "https://aamir.zoviotech.com",
	location: "Peshawar, Pakistan",
	timezoneLabel: "UTC+05",
	timezone: "Asia/Karachi",
	email: "aamirkhan@engineer.com",
	phone: "+92 344 1259408",
	github: "https://github.com/aamir-067",
	linkedin: "https://linkedin.com/in/i-aamir-khan",
	description:
		"Muhammad Aamir Khan is a Sr. Fullstack AI Engineer in Peshawar, Pakistan. He designs and ships AI products end to end: agent systems, retrieval pipelines, realtime backends and the web and mobile products around them.",
} as const;

export interface NavItem {
	label: string;
	href: string;
}

export const nav: NavItem[] = [
	{ label: "About", href: "#about" },
	{ label: "Work", href: "#work" },
	{ label: "What I Build", href: "#build" },
	{ label: "Experience", href: "#experience" },
	{ label: "Writing", href: "#writing" },
	{ label: "Contact", href: "#contact" },
];

export const marqueeTerms = [
	"LangChain",
	"LangGraph",
	"RAG",
	"Vector Search",
	"Redis",
	"BullMQ",
	"WebSockets",
	"PostgreSQL",
	"Prisma",
	"Next.js",
	"TypeScript",
	"Expo React Native",
	"FastAPI",
	"AWS S3",
	"Stripe",
	"Supabase",
	"Contentful",
	"CI/CD",
];
