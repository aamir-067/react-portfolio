import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	robots: { index: false, follow: false },
};

export default function NotFound() {
	return (
		<section className="gutter flex min-h-screen flex-col items-start justify-center">
			<p className="mono text-fg/60">404 / No match in the index</p>
			<h1 className="display mt-6 text-[clamp(3rem,14vw,14rem)]">Nothin&apos; here</h1>
			<Link href="/" className="pill mt-12">
				Back home
			</Link>
		</section>
	);
}
