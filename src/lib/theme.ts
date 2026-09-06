export type Theme = "dark" | "light";

const KEY = "aamir-theme";

export const getTheme = (): Theme =>
	typeof document !== "undefined" &&
	document.documentElement.getAttribute("data-theme") === "light"
		? "light"
		: "dark";

export function setTheme(theme: Theme) {
	document.documentElement.setAttribute("data-theme", theme);
	try {
		localStorage.setItem(KEY, theme);
	} catch {
		/* storage unavailable */
	}
}

export function onThemeChange(callback: (theme: Theme) => void) {
	const observer = new MutationObserver(() => callback(getTheme()));
	observer.observe(document.documentElement, {
		attributes: true,
		attributeFilter: ["data-theme"],
	});
	return () => observer.disconnect();
}

// Runs inline in <head> before first paint.
export const themeBootScript = `(function(){try{var t=localStorage.getItem("${KEY}");document.documentElement.setAttribute("data-theme",t==="light"?"light":"dark")}catch(e){document.documentElement.setAttribute("data-theme","dark")}})()`;
