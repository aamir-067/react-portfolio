import Link from "next/link";

export default function NotFound() {
	return (
		<section className="flex min-h-screen flex-col items-start justify-center px-5 md:px-10">
			<p className="mono-label text-fg/60">404 / No match in the index</p>
			<h1 className="mt-6 font-serif text-[clamp(3rem,10vw,8rem)] leading-[0.95]">
				Nothing <em className="text-accent">retrieved</em> here.
			</h1>
			<Link
				href="/"
				className="mono-label mt-12 inline-flex items-center border border-line px-6 py-4 transition-colors duration-300 hover:border-accent hover:text-accent"
			>
				Back to the signal
			</Link>
		</section>
	);
}
