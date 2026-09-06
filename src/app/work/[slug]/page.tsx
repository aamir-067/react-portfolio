import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { TransitionLink } from "@/components/providers/TransitionProvider";
import CaseStudy from "@/components/work/CaseStudy";
import { projects, site } from "@/content";

export function generateStaticParams() {
	return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const project = projects.find((p) => p.slug === slug);
	if (!project) return { title: "Not Found" };
	const description = `${project.tagline}. ${project.problem}`;
	return {
		title: project.title,
		description,
		alternates: { canonical: `/work/${slug}/` },
		openGraph: {
			type: "article",
			title: `${project.title} · ${site.shortName}`,
			description,
			url: `${site.url}/work/${slug}/`,
		},
	};
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const index = projects.findIndex((p) => p.slug === slug);
	if (index === -1) notFound();
	const project = projects[index];
	const next = projects[(index + 1) % projects.length];

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "CreativeWork",
		"@id": `${site.url}/work/${slug}/#work`,
		name: project.title,
		description: project.tagline,
		author: { "@id": `${site.url}/#person` },
		dateCreated: project.year,
		url: project.link?.href,
	};

	return (
		<article className="gutter pb-28 pt-28 md:pt-36">
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
			<TransitionLink href="/#work" className="hairline mono inline-flex items-center gap-2 text-fg/60">
				<ArrowLeft size={12} aria-hidden />
				All works
			</TransitionLink>
			<CaseStudy project={project} index={index} />
			<TransitionLink
				href={`/work/${next.slug}`}
				data-cursor="Next"
				className="group mt-28 flex items-end justify-between border-t border-line pt-8 md:mt-40"
			>
				<span>
					<span className="mono text-fg/60">Next</span>
					<span className="display mt-3 block text-[clamp(2.4rem,8vw,7.5rem)] transition-transform duration-500 ease-out group-hover:translate-x-3">
						{next.title}
					</span>
				</span>
				<ArrowUpRight size={28} strokeWidth={1.5} aria-hidden className="mb-3 shrink-0 text-fg/60" />
			</TransitionLink>
		</article>
	);
}
