"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { TransitionLink } from "@/components/providers/TransitionProvider";
import { nav, site } from "@/content";
import { prefersReducedMotion } from "@/lib/device";
import { gsap, registerGsap } from "@/lib/gsap";

interface MenuProps {
	open: boolean;
	onClose: () => void;
	time: string;
}

// noth.in-style full takeover. Cobalt field, oversized items, nothing else.
export default function Menu({ open, onClose, time }: MenuProps) {
	const rootRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const root = rootRef.current;
		if (!root) return;
		registerGsap();
		const items = root.querySelectorAll("[data-menu-item]");
		const meta = root.querySelectorAll("[data-menu-meta]");
		const reduced = prefersReducedMotion();

		if (open) {
			document.documentElement.setAttribute("data-menu-open", "");
			gsap.killTweensOf([root, items, meta]);
			gsap.set(root, { display: "flex" });
			gsap.set([items, meta], { clearProps: "transform,opacity,visibility" });
			if (reduced) {
				gsap.set(root, { yPercent: 0 });
				gsap.set([items, meta], { yPercent: 0, autoAlpha: 1 });
				return;
			}
			gsap
				.timeline()
				.fromTo(root, { yPercent: -100 }, { yPercent: 0, duration: 0.7, ease: "expo.inOut" })
				.fromTo(
					items,
					{ yPercent: 110, y: 0 },
					{ yPercent: 0, y: 0, duration: 0.9, stagger: 0.06, ease: "expo.out" },
					"-=0.25",
				)
				.fromTo(meta, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.05 }, "-=0.6");
		} else {
			document.documentElement.removeAttribute("data-menu-open");
			if (root.style.display === "none" || !root.style.display) return;
			if (reduced) {
				gsap.set(root, { display: "none" });
				return;
			}
			gsap.to(root, {
				yPercent: -100,
				duration: 0.6,
				ease: "expo.inOut",
				onComplete: () => gsap.set(root, { display: "none" }),
			});
		}
	}, [open]);

	useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open, onClose]);

	return (
		<div
			ref={rootRef}
			id="site-menu"
			role="dialog"
			aria-modal="true"
			aria-label="Site menu"
			aria-hidden={!open}
			className="gutter fixed inset-0 z-[95] hidden flex-col justify-between bg-cobalt pb-8 pt-28 text-white md:pt-32"
			style={{ display: "none" }}
		>
			<nav aria-label="Menu">
				<ol>
					{nav.map((item, i) => (
						<li key={item.href} className="overflow-hidden border-t border-white/20 last:border-b">
							<TransitionLink
								href={item.href}
								onClick={onClose}
								className="group flex items-baseline justify-between py-3 md:py-4"
							>
								<span
									data-menu-item
									className="display block text-[clamp(2.6rem,9vw,8.5rem)] transition-colors duration-300 group-hover:text-lime"
								>
									{item.label}
								</span>
								<span className="mono text-white/60">{String(i + 1).padStart(2, "0")}</span>
							</TransitionLink>
						</li>
					))}
				</ol>
			</nav>

			<div className="mono flex flex-wrap items-end justify-between gap-6 text-white/80">
				<p data-menu-meta className="flex flex-wrap gap-x-6 gap-y-2">
					<a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hairline inline-flex items-center gap-1">
						LinkedIn <ArrowUpRight size={12} aria-hidden />
					</a>
					<a href={site.github} target="_blank" rel="noopener noreferrer" className="hairline inline-flex items-center gap-1">
						GitHub <ArrowUpRight size={12} aria-hidden />
					</a>
					<a href={`mailto:${site.email}`} className="hairline">
						{site.email}
					</a>
				</p>
				<p data-menu-meta>
					{site.city} {time} {site.timezoneLabel}
				</p>
			</div>
		</div>
	);
}
