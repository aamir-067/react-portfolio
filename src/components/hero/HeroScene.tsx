"use client";

import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { FontLoader, type Font } from "three/examples/jsm/loaders/FontLoader.js";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { getTheme, onThemeChange, type Theme } from "@/lib/theme";

const FONT = "/fonts/poppins-black.typeface.json";

const PALETTE = {
	dark: {
		a: new THREE.Color("#070d4a"),
		b: new THREE.Color("#1b2af0"),
		c: new THREE.Color("#6d7cff"),
		chrome: new THREE.Color("#b7c1ff"),
	},
	light: {
		a: new THREE.Color("#a9c8f2"),
		b: new THREE.Color("#dbe9fb"),
		c: new THREE.Color("#ffffff"),
		chrome: new THREE.Color("#f4f6ff"),
	},
} as const;

const vertexShader = /* glsl */ `
	varying vec2 vUv;
	void main() {
		vUv = uv;
		gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
	}
`;

const fragmentShader = /* glsl */ `
	precision highp float;
	varying vec2 vUv;
	uniform float uTime;
	uniform vec3 uA;
	uniform vec3 uB;
	uniform vec3 uC;
	uniform vec2 uPointer;

	float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
	float noise(vec2 p) {
		vec2 i = floor(p);
		vec2 f = fract(p);
		vec2 u = f * f * (3.0 - 2.0 * f);
		return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
		           mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
	}
	float fbm(vec2 p) {
		float v = 0.0;
		float a = 0.5;
		for (int i = 0; i < 4; i++) {
			v += a * noise(p);
			p *= 2.1;
			a *= 0.5;
		}
		return v;
	}

	void main() {
		vec2 uv = vUv;
		float t = uTime * 0.035;
		float d = uv.x * 0.9 - uv.y * 0.55;
		float n = fbm(uv * 2.4 + vec2(t, -t * 0.6));
		float streak = sin((d + n * 0.35 + t) * 9.0);
		streak = smoothstep(0.15, 0.95, streak);
		float glow = smoothstep(1.2, 0.0, distance(uv, vec2(0.22 + uPointer.x * 0.08, 0.85 + uPointer.y * 0.06)));
		vec3 col = mix(uA, uB, smoothstep(0.0, 1.0, uv.y * 0.8 + uv.x * 0.4));
		col = mix(col, uC, streak * 0.35 + glow * 0.28);
		float grain = (hash(uv * 900.0 + t) - 0.5) * 0.035;
		gl_FragColor = vec4(col + grain, 1.0);
	}
`;

function Backdrop({ theme }: { theme: Theme }) {
	const material = useRef<THREE.ShaderMaterial>(null);
	const { viewport } = useThree();
	const uniforms = useMemo(
		() => ({
			uTime: { value: 0 },
			uA: { value: PALETTE.dark.a.clone() },
			uB: { value: PALETTE.dark.b.clone() },
			uC: { value: PALETTE.dark.c.clone() },
			uPointer: { value: new THREE.Vector2() },
		}),
		[],
	);

	useFrame((state, delta) => {
		const m = material.current;
		if (!m) return;
		const p = PALETTE[theme];
		m.uniforms.uTime.value += delta;
		m.uniforms.uA.value.lerp(p.a, 0.04);
		m.uniforms.uB.value.lerp(p.b, 0.04);
		m.uniforms.uC.value.lerp(p.c, 0.04);
		m.uniforms.uPointer.value.lerp(state.pointer, 0.05);
	});

	return (
		<mesh position={[0, 0, -4]} scale={[viewport.width * 1.9, viewport.height * 1.9, 1]}>
			<planeGeometry args={[1, 1]} />
			<shaderMaterial
				ref={material}
				uniforms={uniforms}
				vertexShader={vertexShader}
				fragmentShader={fragmentShader}
				depthWrite={false}
			/>
		</mesh>
	);
}

function Environment() {
	const { gl, scene } = useThree();
	useEffect(() => {
		const pmrem = new THREE.PMREMGenerator(gl);
		const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
		scene.environment = env;
		return () => {
			scene.environment = null;
			env.dispose();
			pmrem.dispose();
		};
	}, [gl, scene]);
	return null;
}

// Liquid chrome letters. Each glyph is its own body on a spring: the cursor
// pushes it, it tilts with its velocity and settles back. The surface dents
// under the pointer (vertex displacement along the normal), harder the faster
// you move. A light rides with the cursor so reflections travel.
type Glyph = { geometry: THREE.BufferGeometry; x: number };

function buildGlyphs(font: Font, text: string, size: number): { glyphs: Glyph[]; width: number } {
	const resolution = (font.data as { resolution: number }).resolution;
	const glyphData = (font.data as { glyphs: Record<string, { ha: number }> }).glyphs;
	const unit = size / resolution;
	const gap = size * 0.05;
	const glyphs: Glyph[] = [];
	let cursor = 0;
	for (const ch of text) {
		const advance = (glyphData[ch]?.ha ?? glyphData[" "]?.ha ?? 500) * unit;
		if (ch !== " ") {
			const raw = new TextGeometry(ch, {
				font,
				size,
				depth: size * 0.16,
				curveSegments: 14,
				bevelEnabled: true,
				bevelThickness: size * 0.22,
				bevelSize: size * 0.13,
				bevelOffset: 0,
				bevelSegments: 10,
			});
			raw.deleteAttribute("uv");
			const merged = mergeVertices(raw, 1e-4);
			raw.dispose();
			merged.computeVertexNormals();
			merged.computeBoundingBox();
			const box = merged.boundingBox!;
			const cx = (box.min.x + box.max.x) / 2;
			merged.translate(-cx, 0, -(box.min.z + box.max.z) / 2);
			glyphs.push({ geometry: merged, x: cursor + cx });
		}
		cursor += advance + gap;
	}
	const width = cursor - gap;
	let minY = Infinity;
	let maxY = -Infinity;
	glyphs.forEach((g) => {
		const box = g.geometry.boundingBox!;
		minY = Math.min(minY, box.min.y);
		maxY = Math.max(maxY, box.max.y);
	});
	const midY = (minY + maxY) / 2;
	glyphs.forEach((g) => {
		g.x -= width / 2;
		g.geometry.translate(0, -midY, 0);
		g.geometry.computeBoundingBox();
	});
	return { glyphs, width };
}

const dentShader = (shader: THREE.WebGLProgramParametersWithUniforms, uniforms: DentUniforms) => {
	shader.uniforms.uHit = uniforms.uHit;
	shader.uniforms.uDent = uniforms.uDent;
	shader.vertexShader = shader.vertexShader
		.replace("#include <common>", "#include <common>\nuniform vec3 uHit;\nuniform float uDent;")
		.replace(
			"#include <begin_vertex>",
			`#include <begin_vertex>
			vec3 wp = (modelMatrix * vec4(position, 1.0)).xyz;
			float dHit = distance(wp, uHit);
			float g = exp(-dHit * dHit * 1.6);
			transformed -= normal * g * uDent;`,
		);
};

type DentUniforms = { uHit: { value: THREE.Vector3 }; uDent: { value: number } };

interface Body {
	pos: THREE.Vector3;
	vel: THREE.Vector3;
	rot: THREE.Vector3;
	rotVel: THREE.Vector3;
	phase: number;
}

function Word({ theme, word, burst }: { theme: Theme; word: string; burst: number }) {
	const font = useLoader(FontLoader, FONT);
	const { viewport, camera } = useThree();
	const groupRef = useRef<THREE.Group>(null);
	const lightRef = useRef<THREE.PointLight>(null);
	const meshes = useRef<Array<THREE.Mesh | null>>([]);

	const narrow = viewport.width < 7;
	const { glyphs, width } = useMemo(() => buildGlyphs(font, word, 1), [font, word]);
	const scale = (viewport.width * (narrow ? 0.9 : 0.5)) / width;
	useEffect(() => () => glyphs.forEach((g) => g.geometry.dispose()), [glyphs]);

	const dent = useMemo<DentUniforms>(
		() => ({ uHit: { value: new THREE.Vector3(0, 0, 99) }, uDent: { value: 0 } }),
		[],
	);
	const material = useMemo(() => {
		const m = new THREE.MeshPhysicalMaterial({
			color: new THREE.Color("#b7c1ff"),
			metalness: 1,
			roughness: 0.16,
			clearcoat: 0.6,
			clearcoatRoughness: 0.08,
			iridescence: 0.55,
			iridescenceIOR: 1.3,
			iridescenceThicknessRange: [120, 480],
			envMapIntensity: 1.7,
		});
		m.onBeforeCompile = (shader) => dentShader(shader, dent);
		m.customProgramCacheKey = () => "chrome-dent";
		return m;
	}, [dent]);
	useEffect(() => () => material.dispose(), [material]);

	const bodies = useMemo<Body[]>(
		() =>
			glyphs.map((_, i) => ({
				pos: new THREE.Vector3(),
				vel: new THREE.Vector3(),
				rot: new THREE.Vector3(),
				rotVel: new THREE.Vector3(),
				phase: i * 1.7,
			})),
		[glyphs],
	);

	const hit = useMemo(() => new THREE.Vector3(0, 0, 99), []);
	const prevHit = useMemo(() => new THREE.Vector3(0, 0, 99), []);
	const lastBurst = useRef(0);
	const speed = useRef(0);
	const tmp = useMemo(() => new THREE.Vector3(), []);

	useFrame((state, rawDelta) => {
		const dt = Math.min(rawDelta, 1 / 30);
		const g = groupRef.current;
		if (!g) return;

		// Pointer on the z=0 plane, in the group's local (scaled) space.
		tmp.set(state.pointer.x, state.pointer.y, 0.5).unproject(camera).sub(camera.position).normalize();
		const t = -camera.position.z / tmp.z;
		const world = tmp.multiplyScalar(t).add(camera.position);
		const inside = Math.abs(state.pointer.x) <= 1 && Math.abs(state.pointer.y) <= 1;
		if (inside) {
			if (prevHit.z > 50) prevHit.copy(world);
			speed.current += (Math.min(world.distanceTo(prevHit) / Math.max(dt, 1e-3), 40) - speed.current) * 0.25;
			prevHit.copy(world);
			hit.copy(world);
		} else {
			speed.current *= 0.9;
			hit.set(0, 0, 99);
		}
		dent.uHit.value.copy(hit);
		dent.uDent.value += ((inside ? 0.05 + speed.current * 0.012 : 0) - dent.uDent.value) * 0.12;

		if (lightRef.current) {
			lightRef.current.position.set(world.x, world.y, 2.2);
			lightRef.current.intensity += ((inside ? 26 : 0) - lightRef.current.intensity) * 0.1;
		}

		const localHit = g.worldToLocal(hit.clone());
		const burstNow = burst !== lastBurst.current;
		if (burstNow) lastBurst.current = burst;

		const pal = PALETTE[theme];
		material.color.lerp(pal.chrome, 0.05);

		bodies.forEach((b, i) => {
			const mesh = meshes.current[i];
			if (!mesh) return;
			const home = glyphs[i].x;
			const dx = home + b.pos.x - localHit.x;
			const dy = b.pos.y - localHit.y;
			const d2 = dx * dx + dy * dy;
			const radius = 1.35;
			if (inside && d2 < radius * radius) {
				const d = Math.sqrt(d2) || 1e-3;
				const push = (1 - d / radius) * (9 + speed.current * 0.9) * dt;
				b.vel.x += (dx / d) * push;
				b.vel.y += (dy / d) * push;
				b.vel.z += push * 0.6;
			}
			if (burstNow) {
				const ang = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.8;
				const kick = 11 + Math.random() * 6;
				b.vel.x += Math.cos(ang) * kick;
				b.vel.y += Math.sin(ang) * kick;
				b.vel.z += 4 + Math.random() * 4;
				b.rotVel.x += (Math.random() - 0.5) * 22;
				b.rotVel.y += (Math.random() - 0.5) * 22;
			}
			// Spring back home, damped.
			const k = 14;
			const c = 4.2;
			b.vel.x += (-k * b.pos.x - c * b.vel.x) * dt;
			b.vel.y += (-k * b.pos.y - c * b.vel.y) * dt;
			b.vel.z += (-k * b.pos.z - c * b.vel.z) * dt;
			b.pos.addScaledVector(b.vel, dt);

			// Tilt with velocity, plus a slow idle bob.
			const targetRx = -b.vel.y * 0.12 + Math.sin(state.clock.elapsedTime * 0.8 + b.phase) * 0.05;
			const targetRy = b.vel.x * 0.12 + state.pointer.x * 0.12;
			b.rotVel.x += ((targetRx - b.rot.x) * 30 - b.rotVel.x * 6) * dt;
			b.rotVel.y += ((targetRy - b.rot.y) * 30 - b.rotVel.y * 6) * dt;
			b.rot.addScaledVector(b.rotVel, dt);

			mesh.position.set(home + b.pos.x, b.pos.y + Math.sin(state.clock.elapsedTime * 0.9 + b.phase) * 0.04, b.pos.z);
			mesh.rotation.set(b.rot.x, b.rot.y, 0);
		});
	});

	return (
		<>
			<pointLight ref={lightRef} color="#ffffff" intensity={0} distance={7} decay={1.6} />
			<group ref={groupRef} scale={scale} position={[0, narrow ? 1.1 : 0.45, 0]}>
				{glyphs.map((glyph, i) => (
					<mesh
						key={`${word}-${i}`}
						ref={(el) => {
							meshes.current[i] = el;
						}}
						geometry={glyph.geometry}
						material={material}
						position={[glyph.x, 0, 0]}
					/>
				))}
			</group>
		</>
	);
}

interface HeroSceneProps {
	active: boolean;
	word: string;
	eventSource: React.RefObject<HTMLElement | null>;
}

export default function HeroScene({ active, word, eventSource }: HeroSceneProps) {
	const [theme, setTheme] = useState<Theme>("dark");
	const [burst, setBurst] = useState(0);
	useEffect(() => {
		setTheme(getTheme());
		return onThemeChange(setTheme);
	}, []);

	return (
		<Canvas
			dpr={[1, 1.75]}
			frameloop={active ? "always" : "never"}
			camera={{ position: [0, 0, 10], fov: 30 }}
			gl={{ antialias: true, alpha: false }}
			className="!absolute !inset-0"
			eventSource={eventSource as React.RefObject<HTMLElement>}
			eventPrefix="client"
			onPointerDown={() => setBurst((b) => b + 1)}
		>
			<Environment />
			<Backdrop theme={theme} />
			<ambientLight intensity={0.35} />
			<directionalLight position={[3, 7, 6]} intensity={2.8} color="#ffffff" />
			<directionalLight position={[-5, 3, 4]} intensity={1.2} color="#dfe6ff" />
			<pointLight position={[-6, -3, 4]} intensity={18} color="#8fa0ff" />
			<pointLight position={[6, 2, 2]} intensity={10} color="#ffffff" />
			<Word theme={theme} word={word} burst={burst} />
		</Canvas>
	);
}
