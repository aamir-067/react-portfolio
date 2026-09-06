export interface ImageSlot {
	src: string;
	alt: string;
	width: number;
	height: number;
}

// Single source of truth for every image slot. The layout frames use these
// exact ratios, so export your files at these pixel sizes. See IMAGES.md.
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
		height: 1200,
	},
	workLookatlas: {
		src: "/portfolio/lookatlas.webp",
		alt: "LookAtlas studio interface generating studio-quality product photos from an uploaded image",
		width: 1200,
		height: 1500,
	},
	workMorphai: {
		src: "/portfolio/morphAi.webp",
		alt: "Morph AI mobile app routing a user request to the best suited model",
		width: 1200,
		height: 1500,
	},
	workFitdyz: {
		src: "/portfolio/fitdyz.webp",
		alt: "Fitdyz AI mobile app showing a personalized workout plan and the FitBot assistant",
		width: 1200,
		height: 1500,
	},
	workHiredswift: {
		src: "/portfolio/hiredswift.webp",
		alt: "HiredSwift dashboard tracking managed job applications",
		width: 1600,
		height: 1000,
	},
} as const satisfies Record<string, ImageSlot>;

export type ImageKey = keyof typeof images;
