import { images, type ImageKey } from "@/content/images";

interface PlaceholderImageProps {
	id: ImageKey;
	className?: string;
	eager?: boolean;
	tag?: string;
	sizes?: string;
}

export default function PlaceholderImage({
	id,
	className = "",
	eager = false,
	tag,
	sizes,
}: PlaceholderImageProps) {
	const img = images[id];
	return (
		<figure className={`card-media relative overflow-hidden bg-bg-2 ${className}`}>
			<div style={{ aspectRatio: `${img.width} / ${img.height}` }} className="overflow-hidden">
				<img
					src={img.src}
					alt={img.alt}
					width={img.width}
					height={img.height}
					sizes={sizes}
					loading={eager ? "eager" : "lazy"}
					fetchPriority={eager ? "high" : undefined}
					decoding="async"
					className="h-full w-full object-cover"
				/>
			</div>
			{tag && <span className="tag absolute right-0 top-0">{tag}</span>}
		</figure>
	);
}
