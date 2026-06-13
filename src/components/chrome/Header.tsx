"use client";

import { nav, site } from "@/content";
import { TransitionLink } from "@/components/providers/TransitionProvider";

export default function Header() {
	return (
		<header className="fixed inset-x-0 top-0 z-[90] mix-blend-difference">
			<div className="flex items-baseline justify-between px-5 py-5 text-paper md:px-10">
				<TransitionLink
					href="/"
					className="group flex items-baseline gap-3"
					aria-label={`${site.name}, home`}
				>
					<span className="font-serif text-xl leading-none">
						Aamir<span className="italic"> Khan</span>
					</span>
					<span className="mono-label hidden text-paper/60 sm:inline">
						{site.role}
					</span>
				</TransitionLink>
				<nav aria-label="Primary">
					<ul className="flex items-baseline gap-5 md:gap-7">
						{nav.map((item, i) => (
							<li
								key={item.href}
								className={i < 2 || i === nav.length - 1 ? "" : "hidden md:block"}
							>
								<TransitionLink
									href={`/${item.href}`}
									className="mono-label text-paper/80 transition-colors hover:text-paper"
								>
									{item.label}
								</TransitionLink>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</header>
	);
}
