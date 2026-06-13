export interface ImageSlot {
	src: string;
	alt: string;
	width: number;
	height: number;
}

// Swap any placeholder by editing the src line. See IMAGES.md for the manifest.
export const images = {
	aboutPortrait: {
		src: "/placeholders/about-portrait-1200x1500.svg",
		alt: "Portrait of Muhammad Aamir Khan",
		width: 1200,
		height: 1500,
	},
	workCleartraced: {
		src: "/placeholders/work-cleartraced-1600x1000.svg",
		alt: "Cleartraced dashboard showing confidence-scored ESG datapoints traced to their source documents",
		width: 1600,
		height: 1000,
	},
	workLookatlas: {
		src: "/placeholders/work-lookatlas-1600x1000.svg",
		alt: "LookAtlas studio interface generating studio-quality product photos from an uploaded image",
		width: 1600,
		height: 1000,
	},
	workMorphai: {
		src: "/placeholders/work-morphai-900x1800.svg",
		alt: "Morph AI mobile app routing a user request to the best suited model",
		width: 900,
		height: 1800,
	},
	workFitdyz: {
		src: "/placeholders/work-fitdyz-900x1800.svg",
		alt: "Fitdyz AI mobile app showing a personalized workout plan and the FitBot assistant",
		width: 900,
		height: 1800,
	},
	workHiredswift: {
		src: "/placeholders/work-hiredswift-1600x1000.svg",
		alt: "HiredSwift dashboard tracking managed job applications",
		width: 1600,
		height: 1000,
	},
} as const satisfies Record<string, ImageSlot>;

export type ImageKey = keyof typeof images;
