export interface Capability {
	id: string;
	node: string;
	title: string;
	description: string;
	tech: string[];
}

export const capabilities: Capability[] = [
	{
		id: "agents",
		node: "Agents",
		title: "Agent systems",
		description:
			"Crawler fleets, extractor agents and orchestration layers that route work to whichever model suits the task. Multi-provider by design, so no single vendor owns the product.",
		tech: ["LangChain", "LangGraph", "OpenAI", "Claude", "Gemini"],
	},
	{
		id: "retrieval",
		node: "Retrieval",
		title: "Retrieval pipelines",
		description:
			"Assistants that answer from your data instead of guessing. Embeddings, vector search and context management tuned until the model stays grounded in what is true.",
		tech: ["RAG", "Chroma", "Pinecone", "FAISS"],
	},
	{
		id: "realtime",
		node: "Realtime",
		title: "Realtime and async backends",
		description:
			"WebSocket rooms, queue-based processing and caching layers that keep APIs fast while heavy AI work runs in the background.",
		tech: ["WebSockets", "Redis", "BullMQ", "PostgreSQL", "Prisma"],
	},
	{
		id: "fullstack",
		node: "Full-stack",
		title: "Full-stack products",
		description:
			"Multi-role platforms, dashboards and subscription systems carried from first schema to production deploy, with the boring parts done properly.",
		tech: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS"],
	},
	{
		id: "mobile",
		node: "Mobile",
		title: "Mobile AI apps",
		description:
			"Cross-platform apps with OTA updates and store release pipelines. AI features included, performance budgets respected.",
		tech: ["Expo React Native", "Redux", "Play Store", "App Store"],
	},
];
