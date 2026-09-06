// haoqi-style instrument grid: gutter rails, thirds, crosshairs at the
// intersections. Faint by design; it frames, never competes.
const COLS = ["33.333%", "66.666%"];
const ROWS = ["33.333%", "66.666%"];

export default function GridLines() {
	return (
		<div aria-hidden className="pointer-events-none fixed inset-0 z-[5] hidden text-fg/[0.12] md:block">
			<span className="absolute inset-y-0 w-px bg-current" style={{ left: "var(--gutter)" }} />
			<span className="absolute inset-y-0 w-px bg-current" style={{ right: "var(--gutter)" }} />
			{COLS.map((left) => (
				<span key={left} className="absolute inset-y-0 w-px bg-current" style={{ left }} />
			))}
			{ROWS.map((top) => (
				<span key={top} className="absolute inset-x-0 h-px bg-current" style={{ top }} />
			))}
			{ROWS.flatMap((top) =>
				COLS.map((left) => (
					<svg
						key={`${top}-${left}`}
						viewBox="0 0 12 12"
						width="12"
						height="12"
						className="absolute -translate-x-1/2 -translate-y-1/2 text-fg/40"
						style={{ left, top }}
					>
						<path d="M6 0v12M0 6h12" stroke="currentColor" strokeWidth="1" />
					</svg>
				)),
			)}
		</div>
	);
}
