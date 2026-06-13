import { images, type ImageKey } from "@/content/images";

interface PlaceholderImageProps {
	id: ImageKey;
	className?: string;
	meta?: string;
	eager?: boolean;
}

const TICKS = [
	"left-2 top-2 border-l border-t",
	"right-2 top-2 border-r border-t",
	"bottom-2 left-2 border-b border-l",
	"bottom-2 right-2 border-b border-r",
];

export default function PlaceholderImage({
	id,
	className = "",
	meta,
	eager = false,
}: PlaceholderImageProps) {
	const img = images[id];
	return (
		<figure className={className}>
			<div
				data-frame
				className="relative overflow-hidden border border-line bg-paper-soft"
				style={{ aspectRatio: `${img.width} / ${img.height}` }}
			>
				<img
					src={img.src}
					alt={img.alt}
					width={img.width}
					height={img.height}
					loading={eager ? "eager" : "lazy"}
					decoding="async"
					className="h-full w-full object-cover"
				/>
				{TICKS.map((tick) => (
					<span
						key={tick}
						aria-hidden
						className={`absolute z-10 h-2.5 w-2.5 border-fg/40 ${tick}`}
					/>
				))}
			</div>
			{meta && (
				<figcaption className="mono-label mt-2.5 flex items-baseline justify-between gap-4 text-fg/45">
					<span>{meta}</span>
					<span>
						{img.width} x {img.height}
					</span>
				</figcaption>
			)}
		</figure>
	);
}
