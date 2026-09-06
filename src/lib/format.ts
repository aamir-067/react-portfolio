import type { Counter } from "@/content/projects";

export function formatCounter(value: number, counter: Counter) {
	const { prefix = "", suffix = "", decimals = 0, compact = false } = counter;
	let body: string;
	if (compact && value >= 1000) body = `${(value / 1000).toFixed(0)}k`;
	else body = decimals ? value.toFixed(decimals) : Math.round(value).toLocaleString("en-US");
	return `${prefix}${body}${suffix}`;
}
