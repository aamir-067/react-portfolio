export interface ImageSlot {
	src: string;
	alt: string;
	width: number;
	height: number;
}

// Swap any placeholder by editing the src line. See IMAGES.md for the manifest.
export const images = {
	aboutPortrait: {
		src: "/profile.webp",
		alt: "Portrait of Muhammad Aamir Khan",
		width: 1200,
		height: 1500,
	},
	workCleartraced: {
		src: "/portfolio/cleartraced.webp",
		alt: "Cleartraced dashboard showing confidence-scored ESG datapoints traced to their source documents",
		width: 1600,
		height: 1000,
	},
	workLookatlas: {
		src: "/portfolio/lookatlas.webp",
		alt: "LookAtlas studio interface generating studio-quality product photos from an uploaded image",
		width: 1600,
		height: 1000,
	},
	workMorphai: {
		src: "/portfolio/morphAi.webp",
		alt: "Morph AI mobile app routing a user request to the best suited model",
		width: 900,
		height: 1800,
	},
	workFitdyz: {
		src: "/portfolio/fitdyz.webp",
		alt: "Fitdyz AI mobile app showing a personalized workout plan and the FitBot assistant",
		width: 900,
		height: 1800,
	},
	workHiredswift: {
		src: "/portfolio/hiredswift.webp",
		alt: "HiredSwift dashboard tracking managed job applications",
		width: 1600,
		height: 1000,
	},
} as const satisfies Record<string, ImageSlot>;

export type ImageKey = keyof typeof images;
