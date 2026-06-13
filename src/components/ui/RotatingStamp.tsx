"use client";

import { ArrowDown } from "lucide-react";
import Magnetic from "./Magnetic";
import { scrollToTarget } from "@/lib/scroll";

const STAMP_TEXT =
	"Muhammad Aamir Khan · Sr. Fullstack AI Engineer · Portfolio 2026 · ";

const DOT_GRID = [-9, 0, 9];

export default function RotatingStamp({
	className = "",
}: {
	className?: string;
}) {
	return (
		<Magnetic className={className}>
			<button
				type="button"
				onClick={() => scrollToTarget("#work")}
				aria-label="Scroll to selected work"
				className="group relative block h-28 w-28 md:h-32 md:w-32"
			>
				<svg
					viewBox="0 0 120 120"
					className="stamp-rotor h-full w-full"
					aria-hidden
					focusable="false"
				>
					<defs>
						<path
							id="stamp-circle"
							d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0"
						/>
					</defs>
					<text
						fontSize="8.2"
						letterSpacing="2"
						className="font-mono uppercase"
						style={{ fill: "rgb(var(--fg-rgb) / 0.6)" }}
					>
						<textPath
							href="#stamp-circle"
							textLength="289"
							lengthAdjust="spacingAndGlyphs"
						>
							{STAMP_TEXT}
						</textPath>
					</text>
				</svg>
				<span className="absolute inset-0 grid place-items-center">
					<svg
						viewBox="-16 -16 32 32"
						className="h-8 w-8 transition-opacity duration-300 group-hover:opacity-0"
						aria-hidden
						focusable="false"
					>
						{DOT_GRID.flatMap((y) =>
							DOT_GRID.map((x) => (
								<circle
									key={`${x},${y}`}
									cx={x}
									cy={y}
									r={2.4}
									fill={
										x === 0 && y === 0 ? "#ff4d00" : "rgb(var(--fg-rgb))"
									}
								/>
							)),
						)}
					</svg>
					<ArrowDown
						size={20}
						strokeWidth={1.5}
						aria-hidden
						className="absolute text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
					/>
				</span>
			</button>
		</Magnetic>
	);
}
