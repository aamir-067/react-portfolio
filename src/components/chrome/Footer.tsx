"use client";

import { useEffect, useState } from "react";
import { Check, Copy, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import Magnetic from "@/components/ui/Magnetic";
import { site } from "@/content";
import { useSectionAnimation } from "@/hooks/useSectionAnimation";
import { fadeUp, revealLines } from "@/lib/animations";

const links = [
	{ label: "GitHub", href: site.github, Icon: GithubIcon, external: true },
	{
		label: "LinkedIn",
		href: site.linkedin,
		Icon: LinkedinIcon,
		external: true,
	},
	{
		label: site.phone,
		href: `tel:${site.phone.replace(/\s/g, "")}`,
		Icon: Phone,
		external: false,
	},
];

export default function Footer() {
	const [time, setTime] = useState("--:--");
	const [copied, setCopied] = useState(false);
	const rootRef = useSectionAnimation<HTMLElement>((root) => {
		revealLines(root, "[data-lines]");
		fadeUp(root, "[data-fade]", { group: true });
	});

	useEffect(() => {
		const formatter = new Intl.DateTimeFormat("en-GB", {
			hour: "2-digit",
			minute: "2-digit",
			hour12: false,
			timeZone: site.timezone,
		});
		const tick = () => setTime(formatter.format(new Date()));
		tick();
		const id = window.setInterval(tick, 30_000);
		return () => window.clearInterval(id);
	}, []);

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
		<footer
			ref={rootRef}
			id="contact"
			className="theme-ink bg-surface px-5 pb-8 pt-28 md:px-10 md:pt-40"
		>
			<p className="mono-label flex items-center gap-3 text-fg/60">
				<span className="text-accent">06</span>
				<span aria-hidden className="inline-block h-px w-10 bg-line" />
				Contact
			</p>

			<h2
				data-shear
				className="mt-8 font-serif text-[clamp(2.7rem,8.5vw,7.5rem)] leading-[0.95] tracking-[-0.01em]"
			>
				<span data-lines className="block">
					Have something
				</span>
				<span data-lines className="block">
					worth <em className="text-accent">building?</em>
				</span>
			</h2>

			<div className="mt-14" data-fade>
				<p className="mono-label text-fg/50">Email</p>
				<div className="mt-3 flex flex-wrap items-baseline gap-x-7 gap-y-5">
					<a
						href={`mailto:${site.email}`}
						className="relative inline-block font-serif text-[clamp(1.5rem,5.6vw,4.8rem)] leading-none after:absolute after:bottom-[-0.08em] after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-500 hover:after:scale-x-100"
					>
						{site.email}
					</a>
					<Magnetic className="inline-block">
						<button
							type="button"
							onClick={copyEmail}
							aria-live="polite"
							className="mono-label inline-flex items-center gap-2 border border-line px-4 py-3 text-fg/70 transition-colors duration-300 hover:border-accent hover:text-accent"
						>
							{copied ? (
								<>
									<Check size={12} strokeWidth={1.5} aria-hidden />
									Copied
								</>
							) : (
								<>
									<Copy size={12} strokeWidth={1.5} aria-hidden />
									Copy
								</>
							)}
						</button>
					</Magnetic>
				</div>
			</div>

			<ul className="mt-12 flex flex-wrap gap-x-8 gap-y-4" data-fade>
				{links.map(({ label, href, Icon, external }) => (
					<li key={label}>
						<a
							href={href}
							{...(external
								? { target: "_blank", rel: "noopener noreferrer" }
								: {})}
							className="mono-label inline-flex items-center gap-2 text-fg/70 transition-colors duration-300 hover:text-accent"
						>
							<Icon size={14} className="shrink-0" />
							{label}
						</a>
					</li>
				))}
			</ul>

			<div className="mt-24 flex flex-col gap-3 border-t border-line pt-5 md:flex-row md:items-center md:justify-between">
				<p className="mono-label text-fg/45">
					© 2026 {site.name} / {site.role}
				</p>
				<p className="mono-label text-fg/45">
					{site.location} / <span className="text-fg/70">{time} PKT</span>
				</p>
			</div>
		</footer>
	);
}
