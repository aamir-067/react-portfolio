import type { MetadataRoute } from "next";
import { site } from "@/content";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: `${site.name}, ${site.role}`,
		short_name: site.shortName,
		description: site.description,
		start_url: "/",
		display: "standalone",
		background_color: "#f2efe8",
		theme_color: "#f2efe8",
		icons: [
			{ src: "/icon-192.png", sizes: "192x192", type: "image/png" },
			{
				src: "/icon-512.png",
				sizes: "512x512",
				type: "image/png",
				purpose: "any",
			},
			{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
		],
	};
}
