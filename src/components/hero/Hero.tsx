"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import Stickers from "@/components/hero/Stickers";
import { greetings, hero, site } from "@/content";
import { useSectionAnimation } from "@/hooks/useSectionAnimation";
import { prefersReducedMotion } from "@/lib/device";
import { resolveGreeting } from "@/lib/greeting";
import { gsap, SplitText } from "@/lib/gsap";
import { onBootReveal } from "@/lib/motion/boot";

const HeroScene = dynamic(() => import("@/components/hero/HeroScene"), { ssr: false });

const canUseWebGL = () => {
	try {
		const canvas = document.createElement("canvas");
		return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
	} catch {
		return false;
	}
};

export default function Hero() {
	const [scene, setScene] = useState(false);
	const [active, setActive] = useState(true);
	const [word, setWord] = useState<string>(greetings.fallback);
	const sceneHostRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setWord(resolveGreeting());
		if (prefersReducedMotion() || !canUseWebGL()) return;
		setScene(true);
		const host = sceneHostRef.current;
		if (!host) return;
		const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), {
			threshold: 0,
		});
		io.observe(host);
		return () => io.disconnect();
	}, []);

	const rootRef = useSectionAnimation<HTMLElement>((root) => {
		const statement = root.querySelectorAll<HTMLElement>("[data-hero-line]");
		const split = SplitText.create(statement, { type: "lines", mask: "lines", linesClass: "split-line" });
		const tl = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
		tl.from(root.querySelectorAll("[data-hero-fade]"), { autoAlpha: 0, y: 12, duration: 0.9, stagger: 0.06 }, 0.2);
		tl.from(split.lines, { yPercent: 110, duration: 1.2, stagger: 0.09 }, 0.35);
		tl.from(root.querySelectorAll("[data-hero-sticker]"), { autoAlpha: 0, scale: 0.6, duration: 1, stagger: 0.08, ease: "back.out(1.6)" }, 0.9);
		onBootReveal(() => tl.play());
	});

	return (
		<section
			ref={rootRef}
			aria-label="Introduction"
			className="relative flex min-h-[100svh] flex-col overflow-hidden text-[rgb(var(--hero-fg))]"
		>
			<div ref={sceneHostRef} aria-hidden className="hero-fallback absolute inset-0 z-0">
				{scene && <HeroScene active={active} word={word} eventSource={rootRef} />}
			</div>
			<Stickers />

			<div className="gutter relative z-[4] flex flex-1 flex-col pb-24 pt-28 md:pt-36">
				<div className="grid gap-8 md:grid-cols-12">
					<p data-hero-fade className="font-sans text-[clamp(1.4rem,2vw,1.9rem)] font-medium leading-[1.15] tracking-tight md:col-span-4">
						{hero.kicker[0]}
						<br />
						{hero.kicker[1]}
					</p>
					<p data-hero-fade className="mono hidden opacity-85 md:col-span-3 md:col-start-5 md:block">
						{hero.thesis[0]}
						<br />
						{hero.thesis[1]}
					</p>
					<p data-hero-fade className="mono max-w-md !normal-case !tracking-normal opacity-85 md:col-span-4 md:col-start-9">
						{hero.bio}
					</p>
				</div>

				<div className="flex-1" />

				<h1 className="display text-[clamp(2.6rem,7.6vw,7.4rem)]">
					<span className="sr-only">
						{site.name}, {site.role}.{" "}
					</span>
					{hero.statement.map((line) => (
						<span key={line} data-hero-line className="block">
							{line}
						</span>
					))}
				</h1>
			</div>
		</section>
	);
}
