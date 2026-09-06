"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { site } from "@/content";
import { useSectionAnimation } from "@/hooks/useSectionAnimation";
import { fadeUp, revealLines } from "@/lib/animations";

const socials = [
	{ label: "LinkedIn", href: site.linkedin },
	{ label: "GitHub", href: site.github },
];

export default function Footer() {
	const [copied, setCopied] = useState(false);
	const rootRef = useSectionAnimation<HTMLElement>((root) => {
		revealLines(root, "[data-lines]");
		fadeUp(root, "[data-fade]", { group: true });
	});

	const copyEmail = async () => {
		try {
			await navigator.clipboard.writeText(site.email);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 2000);
		} catch {
			/* clipboard unavailable */
		}
	};

	return (
		<footer ref={rootRef} id="contact" className="relative overflow-hidden border-t border-line pt-28 md:pt-40">
			<div className="gutter">
				<p data-fade className="mono text-fg/60">
					Signal over noise
				</p>
				<h2 data-shear className="display mt-8 text-[clamp(2.6rem,9.2vw,9rem)]">
					<span data-lines className="block">
						Let&apos;s build
					</span>
					<span data-lines className="block">
						something that ships
					</span>
				</h2>

				<div data-fade className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-5">
					<a
						href={`mailto:${site.email}`}
						className="hairline font-sans text-[clamp(1.3rem,3.6vw,3rem)] font-semibold tracking-tight"
					>
						{site.email}
					</a>
					<button
						type="button"
						onClick={copyEmail}
						aria-live="polite"
						className="pill !px-5 !py-3"
					>
						{copied ? <Check size={12} aria-hidden /> : <Copy size={12} aria-hidden />}
						{copied ? "Copied" : "Copy"}
					</button>
				</div>

				<div data-fade className="mono mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 text-fg/70">
					{socials.map((s) => (
						<a
							key={s.label}
							href={s.href}
							target="_blank"
							rel="noopener noreferrer"
							className="hairline inline-flex items-center gap-1"
						>
							{s.label} <ArrowUpRight size={12} aria-hidden />
						</a>
					))}
					<a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hairline">
						{site.phone}
					</a>
				</div>
			</div>

			<div aria-hidden className="mt-24 select-none overflow-hidden border-t border-line py-6 md:mt-32">
				<div className="marquee flex w-max">
					{[0, 1].map((copy) => (
						<span key={copy} className="display flex whitespace-nowrap text-[clamp(4rem,14vw,14rem)] leading-none text-fg/10">
							{Array.from({ length: 4 }).map((_, i) => (
								<span key={i} className="px-[0.3em]">
									{site.firstName} {site.lastName}
								</span>
							))}
						</span>
					))}
				</div>
			</div>

			<div className="gutter mono flex flex-col gap-2 border-t border-line py-5 pb-20 text-fg/60 md:flex-row md:items-center md:justify-between">
				<p>
					{site.name} / {site.role}
				</p>
				<p>2026 / {site.location}</p>
			</div>
		</footer>
	);
}
