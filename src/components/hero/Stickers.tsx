"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/content";
import { isFinePointer, prefersReducedMotion } from "@/lib/device";
import { gsap } from "@/lib/gsap";

const STAMP_TEXT = `${site.name.toUpperCase()} • ${site.role.toUpperCase()} • ${site.city.toUpperCase()} • `;

// Sticker layer over the 3D field. Each sticker parallaxes against the pointer
// at its own depth. HTML, not textures: crisp at any DPR and fully themeable.
export default function Stickers() {
	const rootRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const root = rootRef.current;
		if (!root || !isFinePointer() || prefersReducedMotion()) return;
		const layers = Array.from(root.querySelectorAll<HTMLElement>("[data-depth]"));
		const setters = layers.map((el) => ({
			depth: Number(el.dataset.depth),
			x: gsap.quickTo(el, "x", { duration: 0.9, ease: "power3.out" }),
			y: gsap.quickTo(el, "y", { duration: 0.9, ease: "power3.out" }),
		}));
		const onMove = (e: PointerEvent) => {
			const nx = e.clientX / window.innerWidth - 0.5;
			const ny = e.clientY / window.innerHeight - 0.5;
			setters.forEach((s) => {
				s.x(nx * 60 * s.depth);
				s.y(ny * 40 * s.depth);
			});
		};
		window.addEventListener("pointermove", onMove, { passive: true });
		return () => {
			window.removeEventListener("pointermove", onMove);
			layers.forEach((el) => gsap.killTweensOf(el));
		};
	}, []);

	return (
		<div ref={rootRef} aria-hidden className="pointer-events-none absolute inset-0 z-[3] hidden text-[rgb(var(--hero-fg))] md:block">
			<div data-depth="1.2" data-hero-sticker className="absolute right-[5%] top-[36%]">
				<div className="float-c relative h-36 w-36 rounded-full bg-[#efe6cf] text-[#2a2418] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)] lg:h-44 lg:w-44">
					<svg viewBox="0 0 120 120" className="spin-slow h-full w-full" aria-hidden>
						<defs>
							<path id="stamp-ring" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
						</defs>
						<circle cx="60" cy="60" r="55" fill="none" stroke="currentColor" strokeWidth="1.2" />
						<circle cx="60" cy="60" r="33" fill="none" stroke="currentColor" strokeWidth="1.2" />
						<text fontSize="7.4" letterSpacing="1.6" fontFamily="var(--font-mono)" fontWeight="500" fill="currentColor">
							<textPath href="#stamp-ring" textLength="276" lengthAdjust="spacingAndGlyphs">
								{STAMP_TEXT}
							</textPath>
						</text>
						<g transform="translate(60 60)">
							<ellipse rx="22" ry="8" fill="none" stroke="currentColor" strokeWidth="1" />
							<ellipse rx="22" ry="8" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(60)" />
							<ellipse rx="22" ry="8" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(-60)" />
							<circle r="3" fill="currentColor" />
						</g>
					</svg>
				</div>
			</div>

			<div data-depth="1.8" data-hero-sticker className="absolute right-[24%] top-[62%]">
				<span className="float-a inline-flex items-center gap-2 bg-lime px-3 py-2 font-mono text-[11px] uppercase tracking-[0.08em] text-black shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)]">
					<span className="inline-block h-2 w-2 rounded-full bg-black" />
					Open for select work
				</span>
			</div>

			<div data-depth="0.7" data-hero-sticker className="absolute right-[9%] top-[70%]">
				<svg viewBox="0 0 48 56" className="float-b h-20 w-20 drop-shadow-[0_18px_30px_rgba(0,0,0,0.45)]" aria-hidden>
					<path d="M4 2 L44 30 L26 33 L36 52 L28 54 L18 36 L4 48 Z" fill="#3b57ff" stroke="#ffffff" strokeWidth="3" strokeLinejoin="round" />
				</svg>
			</div>

			<div data-depth="1.4" data-hero-sticker className="absolute left-[8%] top-[36%]">
				<span className="float-c inline-flex rotate-[-10deg] items-center gap-2 border border-current bg-[rgb(var(--hero-fg)/0.08)] px-3 py-2 font-mono text-[11px] uppercase tracking-[0.08em] backdrop-blur-sm">
					Agents / RAG / Realtime
					<ArrowUpRight size={12} aria-hidden />
				</span>
			</div>
		</div>
	);
}
