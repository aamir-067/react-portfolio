import type { ReactNode } from "react";

interface SectionHeadingProps {
	index: string;
	label: string;
	title: ReactNode;
	className?: string;
	titleClassName?: string;
}

export default function SectionHeading({
	index,
	label,
	title,
	className = "",
	titleClassName = "text-[clamp(2.6rem,6.5vw,5.5rem)]",
}: SectionHeadingProps) {
	return (
		<header className={className}>
			<p className="mono-label flex items-center gap-3 text-fg/60">
				<span className="text-accent">{index}</span>
				<span aria-hidden className="inline-block h-px w-10 bg-line" />
				{label}
			</p>
			<h2
				data-lines
				data-shear
				className={`mt-6 font-serif leading-[0.95] tracking-[-0.01em] ${titleClassName}`}
			>
				{title}
			</h2>
		</header>
	);
}
