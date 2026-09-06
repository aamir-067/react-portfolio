"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useRef,
	type AnchorHTMLAttributes,
	type MouseEvent,
	type ReactNode,
} from "react";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/device";
import { getLenis, scrollToTarget } from "@/lib/scroll";

const TransitionContext = createContext<(href: string) => void>(() => {});

export function useRouteTransition() {
	return useContext(TransitionContext);
}

const normalizePath = (path: string) => path.replace(/\/+$/, "") || "/";

export default function TransitionProvider({
	children,
}: {
	children: ReactNode;
}) {
	const veilRef = useRef<HTMLDivElement>(null);
	const coveringRef = useRef(false);
	const pendingHashRef = useRef<string | null>(null);
	const watchdogRef = useRef(0);
	const router = useRouter();
	const pathname = usePathname();

	const liftVeil = useCallback((hash: string | null) => {
		const veil = veilRef.current;
		coveringRef.current = false;
		window.clearTimeout(watchdogRef.current);
		if (!veil) return;
		gsap.to(veil, {
			yPercent: -101,
			duration: 0.6,
			ease: "expo.out",
			delay: 0.08,
			overwrite: true,
			onComplete: () => {
				gsap.set(veil, { display: "none" });
				if (hash) scrollToTarget(`#${hash}`);
			},
		});
	}, []);

	const navigate = useCallback(
		(href: string) => {
			const [path, hash] = href.split("#");
			const targetPath = normalizePath(path || "/");
			if (targetPath === normalizePath(pathname)) {
				if (hash) scrollToTarget(`#${hash}`);
				else getLenis()?.scrollTo(0, { duration: 1.2 });
				return;
			}
			if (prefersReducedMotion() || !veilRef.current) {
				router.push(href);
				return;
			}
			registerGsap();
			coveringRef.current = true;
			pendingHashRef.current = hash ?? null;
			// Fail-safe: never leave the veil covering the page.
			window.clearTimeout(watchdogRef.current);
			watchdogRef.current = window.setTimeout(() => {
				if (coveringRef.current) liftVeil(pendingHashRef.current);
			}, 2200);
			gsap
				.timeline()
				.set(veilRef.current, { display: "block", yPercent: 100 })
				.to(veilRef.current, {
					yPercent: 0,
					duration: 0.5,
					ease: "expo.inOut",
					onComplete: () => router.push(href),
				});
		},
		[pathname, router, liftVeil],
	);

	useEffect(() => {
		if (!coveringRef.current) return;
		const hash = pendingHashRef.current;
		pendingHashRef.current = null;

		const lenis = getLenis();
		if (lenis) lenis.scrollTo(0, { immediate: true });
		else window.scrollTo(0, 0);

		requestAnimationFrame(() => {
			ScrollTrigger.refresh();
			liftVeil(hash);
		});
	}, [pathname, liftVeil]);

	useEffect(() => () => window.clearTimeout(watchdogRef.current), []);

	return (
		<TransitionContext.Provider value={navigate}>
			{children}
			<div
				ref={veilRef}
				aria-hidden
				className="fixed inset-0 z-[110] hidden bg-cobalt"
			>
			</div>
		</TransitionContext.Provider>
	);
}

interface TransitionLinkProps
	extends AnchorHTMLAttributes<HTMLAnchorElement> {
	href: string;
	children: ReactNode;
}

export function TransitionLink({
	href,
	children,
	onClick,
	...rest
}: TransitionLinkProps) {
	const navigate = useRouteTransition();
	const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
		onClick?.(e);
		if (
			e.defaultPrevented ||
			e.metaKey ||
			e.ctrlKey ||
			e.shiftKey ||
			e.altKey ||
			e.button !== 0
		)
			return;
		e.preventDefault();
		navigate(href);
	};
	return (
		<Link href={href} onClick={handleClick} {...rest}>
			{children}
		</Link>
	);
}
