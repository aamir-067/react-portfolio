import { greetings } from "@/content";

const lang = (tag: string) => tag.toLowerCase().split("-")[0];

// Region first (timezone is the closest thing a static site has to location),
// then browser language, then the default. Edit the maps in content/site.ts.
export function resolveGreeting(
	timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "",
	languages: readonly string[] = typeof navigator === "undefined" ? [] : navigator.languages,
): string {
	const byZone = greetings.byTimeZone[timeZone];
	if (byZone) return byZone;
	for (const tag of languages) {
		const hit = greetings.byLanguage[lang(tag)];
		if (hit) return hit;
	}
	return greetings.fallback;
}
