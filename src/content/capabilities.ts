export interface Capability {
	index: string;
	title: string;
	description: string;
	tech: string[];
}

export const capabilities: Capability[] = [
	{
		index: "01",
		title: "Agent systems",
		description:
			"Crawler fleets, extractor agents and orchestration layers that route work to whichever model suits the task. Multi-provider by design, so no single vendor owns the product.",
		tech: ["LangChain", "LangGraph", "OpenAI", "Claude", "Gemini"],
	},
	{
		index: "02",
		title: "Retrieval pipelines",
		description:
			"Assistants that answer from your data instead of guessing. Embeddings, vector search and context management tuned until the model stays grounded in what is true.",
		tech: ["RAG", "Chroma", "Pinecone", "FAISS"],
	},
	{
		index: "03",
		title: "Realtime and async backends",
		description:
			"WebSocket rooms, queue-based processing and caching layers that keep APIs fast while heavy AI work runs in the background.",
		tech: ["WebSockets", "Redis", "BullMQ", "PostgreSQL", "Prisma"],
	},
	{
		index: "04",
		title: "Full-stack products",
		description:
			"Multi-role platforms, dashboards and subscription systems carried from first schema to production deploy, with the boring parts done properly.",
		tech: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS"],
	},
	{
		index: "05",
		title: "Mobile AI apps",
		description:
			"Cross-platform apps with OTA updates and store release pipelines. AI features included, performance budgets respected.",
		tech: ["Expo React Native", "Redux", "Play Store", "App Store"],
	},
];
