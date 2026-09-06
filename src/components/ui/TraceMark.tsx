"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { TraceNote } from "@/content/projects";

interface TraceMarkProps extends TraceNote {
	align?: "left" | "right";
}

// A claim's source. Hover or focus reveals where the number came from.
export default function TraceMark({ status, note, align = "left" }: TraceMarkProps) {
	const id = useId();
	const [open, setOpen] = useState(false);
	const rootRef = useRef<HTMLSpanElement>(null);
	const verified = status === "verified";

	useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
		const onDown = (e: PointerEvent) => {
			if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
		};
		window.addEventListener("keydown", onKey);
		window.addEventListener("pointerdown", onDown);
		return () => {
			window.removeEventListener("keydown", onKey);
			window.removeEventListener("pointerdown", onDown);
		};
	}, [open]);

	return (
		<span
			ref={rootRef}
			className="trace-mark relative inline-block align-baseline"
			{...(open ? { "data-open": "" } : {})}
		>
			<button
				type="button"
				aria-describedby={id}
				aria-expanded={open}
				aria-label={verified ? "Verified source" : "Self-reported source"}
				onClick={() => setOpen((v) => !v)}
				className="relative -top-[0.35em] ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full text-fg/60 transition-colors hover:text-fg"
			>
				<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden focusable="false">
					<circle
						cx="8"
						cy="8"
						r="6.5"
						fill="none"
						stroke="currentColor"
						strokeWidth="1"
					/>
					{verified ? (
						<path
							d="M5 8.2l2 2 4-4.4"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					) : (
						<circle cx="8" cy="8" r="1.6" fill="currentColor" />
					)}
				</svg>
			</button>
			<span
				role="tooltip"
				id={id}
				className={`trace-note absolute bottom-full z-30 mb-3 w-64 border border-line bg-bg-2 p-3.5 text-left shadow-[0_18px_40px_-20px_rgba(0,0,0,0.5)] ${
					align === "right" ? "right-0" : "left-0"
				}`}
			>
				<span className="mono-sm flex items-center gap-2 text-fg/60">
					<span
						aria-hidden
						className={`inline-block h-1.5 w-1.5 rounded-full ${verified ? "bg-lime" : "border border-fg/60"}`}
					/>
					{verified ? "Verified" : "Self-reported"}
				</span>
				<span className="mt-2 block font-sans text-[13px] normal-case leading-relaxed tracking-normal text-fg/85">
					{note}
				</span>
			</span>
		</span>
	);
}
