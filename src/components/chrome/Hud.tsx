"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Globe } from "lucide-react";
import { TransitionLink } from "@/components/providers/TransitionProvider";
import Menu from "@/components/chrome/Menu";
import { site } from "@/content";
import { isFinePointer } from "@/lib/device";
import { ScrollTrigger, registerGsap } from "@/lib/gsap";
import { getTheme, onThemeChange, setTheme, type Theme } from "@/lib/theme";

const pad = (n: number, width = 4) => String(n).padStart(width, "0");

export default function Hud() {
	const pathname = usePathname();
	const [theme, setThemeState] = useState<Theme>("dark");
	const [menuOpen, setMenuOpen] = useState(false);
	const [time, setTime] = useState("--:--");
	const coordsRef = useRef<HTMLParagraphElement>(null);

	useEffect(() => {
		setThemeState(getTheme());
		return onThemeChange(setThemeState);
	}, []);

	useEffect(() => {
		setMenuOpen(false);
	}, [pathname]);

	// The HUD is fixed; sections flip register underneath it. Track which
	// register sits under each bar so the type stays legible.
	useEffect(() => {
		registerGsap();
		const root = document.documentElement;
		const scopes = Array.from(document.querySelectorAll<HTMLElement>(".invert-scope"));
		const bars: Array<[string, () => number]> = [
			["data-hud-top-invert", () => 40],
			["data-hud-bottom-invert", () => window.innerHeight - 40],
		];
		const triggers = scopes.flatMap((scope) =>
			bars.map(([attr, line]) =>
				ScrollTrigger.create({
					trigger: scope,
					start: () => `top ${line()}px`,
					end: () => `bottom ${line()}px`,
					onToggle: (self) => {
						if (self.isActive) root.setAttribute(attr, "");
						else root.removeAttribute(attr);
					},
				}),
			),
		);
		return () => {
			triggers.forEach((t) => t.kill());
			root.removeAttribute("data-hud-top-invert");
			root.removeAttribute("data-hud-bottom-invert");
		};
	}, [pathname]);

	useEffect(() => {
		const formatter = new Intl.DateTimeFormat("en-GB", {
			hour: "2-digit",
			minute: "2-digit",
			hour12: false,
			timeZone: site.timezone,
		});
		const tick = () => setTime(formatter.format(new Date()));
		tick();
		const id = window.setInterval(tick, 15_000);
		return () => window.clearInterval(id);
	}, []);

	useEffect(() => {
		const el = coordsRef.current;
		if (!el || !isFinePointer()) return;
		let raf = 0;
		let x = 0;
		let y = 0;
		const onMove = (e: PointerEvent) => {
			x = e.clientX;
			y = e.clientY;
			if (raf) return;
			raf = requestAnimationFrame(() => {
				raf = 0;
				el.textContent = `${pad(Math.round(x))} X  ${pad(Math.round(y))} Y`;
			});
		};
		window.addEventListener("pointermove", onMove, { passive: true });
		return () => {
			window.removeEventListener("pointermove", onMove);
			cancelAnimationFrame(raf);
		};
	}, []);

	const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

	return (
		<>
			<header className="hud-top gutter fixed inset-x-0 top-0 z-[97] flex items-center justify-between py-5 md:py-7">
				<TransitionLink
					href="/"
					className="font-sans text-[15px] font-extrabold tracking-tight"
					aria-label={`${site.name}, home`}
				>
					{site.wordmark}
				</TransitionLink>
				<nav aria-label="Primary" className="mono flex items-center gap-6 md:gap-10">
					<TransitionLink href="/#work" className="hairline hidden sm:inline">
						Work
					</TransitionLink>
					<TransitionLink href="/#contact" className="hairline hidden sm:inline">
						Contact
					</TransitionLink>
					<button
						type="button"
						onClick={toggleTheme}
						aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
						className="hairline"
					>
						Theme[{theme === "dark" ? "D" : "L"}]
					</button>
					<button
						type="button"
						onClick={() => setMenuOpen((v) => !v)}
						aria-expanded={menuOpen}
						aria-controls="site-menu"
						className="hairline"
					>
						{menuOpen ? "Close[x]" : "Menu[::]"}
					</button>
				</nav>
			</header>

			<Menu open={menuOpen} onClose={() => setMenuOpen(false)} time={time} />

			<div className="hud-bottom gutter pointer-events-none fixed inset-x-0 bottom-0 z-[90] flex items-center justify-between py-5 md:py-6">
				<p className="mono">
					{site.timezoneLabel} {site.country}{" "}
					<time className="tabular-nums">{time}</time>
					<span className="hidden sm:inline"> {site.city}</span>
				</p>
				<p ref={coordsRef} aria-hidden className="mono hidden whitespace-pre lg:block">
					0000 X  0000 Y
				</p>
				<Globe size={20} strokeWidth={1.2} aria-hidden className="text-fg/80" />
			</div>
		</>
	);
}
