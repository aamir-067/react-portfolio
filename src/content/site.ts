export const site = {
	name: "Muhammad Aamir Khan",
	shortName: "Aamir Khan",
	firstName: "Aamir",
	lastName: "Khan",
	wordmark: "AAMIR.KHAN",
	role: "Sr. Fullstack AI Engineer",
	url: "https://aamir.zoviotech.com",
	location: "Peshawar, Pakistan",
	city: "Peshawar",
	country: "PK",
	timezoneLabel: "PKT",
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
	{ label: "Work", href: "/#work" },
	{ label: "About", href: "/#about" },
	{ label: "Index", href: "/#index" },
	{ label: "Writing", href: "/blogs" },
	{ label: "Contact", href: "/#contact" },
];

export const hero = {
	kicker: ["AI Systems &", "Engineering"],
	thesis: ["Thinking in systems.", "Shipping the whole thing."],
	bio: "I'm Aamir Khan, a fullstack engineer building agent pipelines, retrieval systems and the products around them at Metasense Technologies. Outside work, I teach modern web practice.",
	statement: ["I build", "AI systems", "that ship."],
} as const;

// The 3D greeting in the hero. Keys are lowercase ISO 639-1 language codes
// and IANA time zones. Latin script only (the 3D typeface has no other glyphs).
export const greetings = {
	fallback: "hello",
	byLanguage: {
		en: "hello",
		de: "hallo",
		nl: "hallo",
		fr: "bonjour",
		es: "hola",
		it: "ciao",
		pt: "olá",
		tr: "merhaba",
		hi: "namaste",
		ja: "konnichiwa",
		ko: "annyeong",
		sv: "hej",
		da: "hej",
		no: "hei",
		fi: "hei",
		pl: "cześć",
		ru: "privet",
	} as Record<string, string>,
	byTimeZone: {
		"Europe/Berlin": "hallo",
		"Europe/Vienna": "hallo",
		"Europe/Zurich": "hallo",
		"Europe/Amsterdam": "hallo",
		"Europe/Paris": "bonjour",
		"Europe/Brussels": "bonjour",
		"Europe/Madrid": "hola",
		"America/Mexico_City": "hola",
		"America/Bogota": "hola",
		"America/Buenos_Aires": "hola",
		"Europe/Rome": "ciao",
		"Europe/Lisbon": "olá",
		"America/Sao_Paulo": "olá",
		"Europe/Istanbul": "merhaba",
		"Asia/Kolkata": "namaste",
		"Asia/Tokyo": "konnichiwa",
		"Asia/Seoul": "annyeong",
		"Europe/Stockholm": "hej",
		"Europe/Copenhagen": "hej",
		"Europe/Oslo": "hei",
		"Europe/Helsinki": "hei",
		"Europe/Warsaw": "cześć",
		"Europe/Moscow": "privet",
	} as Record<string, string>,
} as const;

export const manifesto = {
	lines: ["Not a model, a system.", "Because the model is the easy part."],
	footnote: "Sr. Fullstack AI Engineer in Peshawar. Available for select work.",
} as const;

export interface Stat {
	label: string;
	from: number;
	to: number;
	prefix?: string;
	suffix?: string;
	source: string;
}

// Every figure here appears in experience.ts or a case study. Nothing invented.
export const stats: Stat[] = [
	{
		label: "Average API response after the rework",
		from: 800,
		to: 200,
		suffix: "ms",
		source: "Metasense Technologies, ESG climate tracker backend, measured under 10,000 daily requests.",
	},
	{
		label: "Corporate clients on the ESG tracker",
		from: 0,
		to: 50,
		suffix: "+",
		source: "Metasense Technologies, Sweden-based ESG climate tracker.",
	},
	{
		label: "Fields extracted per company",
		from: 0,
		to: 300,
		suffix: "+",
		source: "Cleartraced extractor agents, production pipeline.",
	},
	{
		label: "Students taught modern web practice",
		from: 0,
		to: 20,
		suffix: "+",
		source: "Self-reported teaching record.",
	},
];
