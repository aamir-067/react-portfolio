import type { ReactNode } from "react";

interface SectionHeadingProps {
	title: string;
	aside?: ReactNode;
	className?: string;
}

// noth.in register: a hard bold word top-left, a statement to the right.
export default function SectionHeading({ title, aside, className = "" }: SectionHeadingProps) {
	return (
		<header className={`grid gap-8 md:grid-cols-12 ${className}`}>
			<h2 data-fade className="display text-[clamp(1.8rem,3.2vw,3rem)] md:col-span-4">
				{title}
			</h2>
			{aside && (
				<p
					data-lines
					className="font-sans text-[clamp(1.6rem,3.4vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.03em] md:col-span-7 md:col-start-6"
				>
					{aside}
				</p>
			)}
		</header>
	);
}
