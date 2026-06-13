import type { ImageKey } from "./images";

export interface ProjectMetric {
	value: string;
	label: string;
}

export interface Project {
	index: string;
	slug: string;
	title: string;
	tagline: string;
	role: string;
	year: string;
	stack: string[];
	problem: string;
	approach: string;
	outcome: string;
	metrics: ProjectMetric[];
	link?: { href: string; label: string };
	image: ImageKey;
	orientation: "landscape" | "portrait";
}

export const projects: Project[] = [
	{
		index: "01",
		slug: "cleartraced",
		title: "Cleartraced",
		tagline: "AI ESG and financial data extraction",
		role: "AI Engineer",
		year: "2026",
		stack: [
			"AI agents",
			"Web crawling",
			"RAG",
			"Vector database",
			"PostgreSQL",
			"Document extraction",
		],
		problem:
			"Banks waste weeks pulling ESG and financial figures out of company reports by hand. The data lives in annual reports, sustainability statements and regulatory filings, and extracting it manually is slow, expensive and hard to audit.",
		approach:
			"For a given company and year, crawler agents locate the right disclosures and cross-check them for consistency. Extractor agents then pull the exact data points each client needs, from revenue and EBIT to carbon emissions and board makeup, across more than 300 fields. A multi-layer algorithm scores every value for confidence, and an analyst verifies it before delivery.",
		outcome:
			"Weeks of manual analyst work now run as an agent pipeline with human verification at the end, and every figure stays traceable to its source. In production with clients including Millistream and Global Child Forum.",
		metrics: [
			{ value: "300+", label: "Fields extracted per company" },
			{ value: "100%", label: "Figures traceable to source" },
		],
		// TODO: add live URL for Cleartraced if one should be public
		image: "workCleartraced",
		orientation: "landscape",
	},
	{
		index: "02",
		slug: "lookatlas",
		title: "LookAtlas",
		tagline: "AI virtual product studio",
		role: "Fullstack Engineer",
		year: "2026",
		stack: ["Gemini", "Supabase", "Stripe", "Shopify"],
		problem:
			"Product photoshoots are expensive and slow, which holds back brands that need fresh visuals often. Every new campaign means a studio, a crew, sample logistics and weeks of waiting.",
		approach:
			"Brands upload product images, pick a style or pose, and the platform generates clean, studio-quality photos and short videos in minutes, handling lighting, angles and composition automatically. I worked across the full stack, from generation flows on Gemini to billing with Stripe, Shopify integration and a Supabase backbone.",
		outcome:
			"A costly, slow shoot becomes a few minutes of work. Brands keep one consistent look across the whole catalog without booking a studio again.",
		metrics: [
			{ value: "Minutes", label: "From upload to studio-grade shots" },
			{ value: "0", label: "Studios, crews or reshoots needed" },
		],
		link: { href: "https://lookatlas.com", label: "lookatlas.com" },
		image: "workLookatlas",
		orientation: "landscape",
	},
	{
		index: "03",
		slug: "morph-ai",
		title: "Morph AI",
		tagline: "Every model, one subscription",
		role: "Project Lead Developer",
		year: "2026",
		stack: ["React Native", "Node.js", "Hugging Face", "Supabase", "Stripe"],
		problem:
			"Power users juggle several AI subscriptions and keep switching apps for writing, research and creative work. Each tool brings its own bill, its own context and its own limits.",
		approach:
			"Morph AI brings that work into one mobile app. An orchestration layer routes every request to the model or agent best suited to the task, drawing on multiple leading LLMs and specialized agents, so users never pick or manage models themselves. Heavy image work runs through async processing pipelines to keep the app responsive.",
		outcome:
			"Live on the Google Play Store with subscription and ad revenue running. The app crossed a thousand downloads, and image operations hold under 1.5 seconds even in heavy usage scenarios.",
		metrics: [
			{ value: "1k+", label: "Play Store downloads" },
			{ value: "<1.5s", label: "Image ops under heavy load" },
		],
		image: "workMorphai",
		orientation: "portrait",
	},
	{
		index: "04",
		slug: "fitdyz-ai",
		title: "Fitdyz AI",
		tagline: "AI workouts, diets and a coach that knows your plan",
		role: "Project Lead",
		year: "2026",
		stack: [
			"Expo React Native",
			"Node.js",
			"PostgreSQL",
			"Prisma",
			"Redis + BullMQ",
			"LangChain",
			"WebSockets",
		],
		problem:
			"Many people want to get fit but do not know how to structure workouts or eat well, and motivation fades fast once the first excitement wears off.",
		approach:
			"Users enter their details and the app builds a personalized workout and diet plan, then tracks calories, workouts and meals in one place. FitBot, the in-app assistant, answers questions grounded in each user's own plan through a retrieval pipeline over a vector database. Challenges reward tokens that users spend on live chat with a real coach over authenticated WebSocket rooms, while Redis and BullMQ queues keep heavy AI generation off the request path.",
		outcome:
			"A clear plan, steady motivation, and fitness that is easier to stick with. Under the hood it runs like a production system: relational PostgreSQL schema with Prisma, role-aware APIs, async queues and realtime chat.",
		metrics: [],
		image: "workFitdyz",
		orientation: "portrait",
	},
	{
		index: "05",
		slug: "hiredswift",
		title: "HiredSwift",
		tagline: "Human powered job applications",
		role: "Fullstack Lead Developer",
		year: "2026",
		// TODO: confirm WebSockets belongs in the HiredSwift stack (flagged in my-information)
		stack: ["Next.js", "Firebase", "Stripe", "WebSockets"],
		problem:
			"Job hunting eats time. Each application can take 30 minutes or more, and the sheer volume wears people down long before they reach an interview.",
		approach:
			"Users buy an application package and upload their documents. A real team then applies on their behalf with personalized, human-written materials tailored to each role, not auto-generated spam. I led the build end to end on Next.js, with Firebase powering the dashboards and Stripe handling packages.",
		outcome:
			"Applicants reclaim hours every week and move through hiring with far less pressure, spending their energy on interview prep instead of forms.",
		metrics: [{ value: "30+ min", label: "Reclaimed per application" }],
		link: { href: "https://hiredswift.com", label: "hiredswift.com" },
		image: "workHiredswift",
		orientation: "landscape",
	},
];
