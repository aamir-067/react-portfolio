export interface ExperienceEntry {
	company: string;
	location: string;
	role: string;
	period: string;
	highlights: string[];
}

export const experience: ExperienceEntry[] = [
	{
		company: "Metasense Technologies",
		location: "Peshawar",
		role: "Full Stack Developer",
		period: "Dec 2024 / Present",
		highlights: [
			"Engineered the backend for a Sweden-based ESG climate tracker now reaching 50+ corporate clients.",
			"Cut average response times from 800ms to 200ms under 10,000 daily requests by reworking schemas and caching layers.",
			"Built Liquid Canvas art apps for LG and Samsung TVs, lifting viewer engagement by 30%.",
		],
	},
	{
		company: "Devsort Services",
		location: "Islamabad",
		role: "Full Stack Web Developer",
		period: "Jul 2024 / Nov 2024",
		highlights: [
			"Led an ERP and point-of-sale build that cut manual entry errors by 45%.",
			"Architected a hotel management backend supporting 1,200+ daily reservations.",
			"Mentored three junior developers and helped cut bug resolution from 48 hours to under 12.",
		],
	},
];

export const education = {
	degree: "BS Software Engineering",
	school: "UST Bannu, KPK, Pakistan",
};

export const certifications = [
	"IBM RAG and Agentic AI, Coursera",
	"Edureka CI/CD, Automation and Monitoring, Coursera",
	"JavaScript Intermediate, HackerRank",
	"Overcoming Your Fear of Public Speaking, LinkedIn Learning",
];
