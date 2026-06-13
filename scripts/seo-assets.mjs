// One-off asset pipeline: optimize raster images to WebP and generate the
// OG card + PWA/apple icons. Run with `node scripts/seo-assets.mjs`.
// Safe to re-run; it only writes derived files and never deletes sources.
import sharp from "sharp";
import fs from "fs";
import path from "path";

const root = process.cwd();
const pub = path.join(root, "public");
const app = path.join(root, "src", "app");

const kb = (n) => `${(n / 1024).toFixed(0)}KB`;
const sizeOf = (p) => (fs.existsSync(p) ? fs.statSync(p).size : 0);

async function toWebp(input, { maxSide = 1600, quality = 80 } = {}) {
	const out = input.replace(/\.(png|jpe?g)$/i, ".webp");
	await sharp(input)
		.rotate()
		.resize({ width: maxSide, height: maxSide, fit: "inside", withoutEnlargement: true })
		.webp({ quality, effort: 5 })
		.toFile(out);
	const before = sizeOf(input);
	const after = sizeOf(out);
	console.log(
		`  ${path.relative(root, input)} ${kb(before)} -> ${path.relative(root, out)} ${kb(after)} (-${(100 - (after / before) * 100).toFixed(0)}%)`
	);
}

async function optimizeImages() {
	console.log("Optimizing images -> WebP");
	const targets = [
		path.join(pub, "profile.png"),
		...fs
			.readdirSync(path.join(pub, "portfolio"))
			.filter((f) => /\.(png|jpe?g)$/i.test(f))
			.map((f) => path.join(pub, "portfolio", f)),
		...fs
			.readdirSync(path.join(pub, "blogs"))
			.filter((f) => /-cover\.(png|jpe?g)$/i.test(f))
			.map((f) => path.join(pub, "blogs", f)),
	];
	for (const t of targets) await toWebp(t);
}

const ink = "#15130e";
const paper = "#f2efe8";
const accent = "#ff4d00";

function dotGrid(x, y, gap) {
	const r = 5.5;
	let dots = "";
	for (let row = 0; row < 3; row++) {
		for (let col = 0; col < 3; col++) {
			const cx = x + col * gap;
			const cy = y + row * gap;
			const fill = row === 1 && col === 1 ? accent : ink;
			dots += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>`;
		}
	}
	return dots;
}

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${paper}"/>
  <rect x="20" y="20" width="1160" height="590" fill="none" stroke="rgba(21,19,14,0.22)" stroke-width="2"/>
  ${dotGrid(96, 96, 26)}
  <text x="96" y="318" font-family="Georgia, 'Times New Roman', serif" font-size="86" fill="${ink}">Muhammad Aamir Khan</text>
  <text x="98" y="392" font-family="Helvetica, Arial, sans-serif" font-size="40" font-weight="600" fill="${accent}">Sr. Fullstack AI Engineer</text>
  <text x="98" y="452" font-family="Helvetica, Arial, sans-serif" font-size="27" fill="rgba(21,19,14,0.62)">AI agents · retrieval pipelines · realtime backends</text>
  <line x1="96" y1="520" x2="1104" y2="520" stroke="rgba(21,19,14,0.18)" stroke-width="1.5"/>
  <text x="96" y="560" font-family="ui-monospace, 'Courier New', monospace" font-size="24" letter-spacing="2" fill="${ink}">aamir.zoviotech.com</text>
  <text x="1104" y="560" text-anchor="end" font-family="ui-monospace, 'Courier New', monospace" font-size="24" letter-spacing="2" fill="rgba(21,19,14,0.55)">Peshawar, PK</text>
</svg>`;

async function generateOg() {
	console.log("Generating OG card");
	await sharp(Buffer.from(ogSvg)).png().toFile(path.join(pub, "og.png"));
	console.log(`  public/og.png 1200x630 ${kb(sizeOf(path.join(pub, "og.png")))}`);
}

async function generateIcons() {
	console.log("Generating icons from src/app/icon.svg");
	const icon = path.join(app, "icon.svg");
	const jobs = [
		{ out: path.join(app, "apple-icon.png"), size: 180 },
		{ out: path.join(pub, "icon-192.png"), size: 192 },
		{ out: path.join(pub, "icon-512.png"), size: 512 },
	];
	for (const j of jobs) {
		await sharp(icon).resize(j.size, j.size).png().toFile(j.out);
		console.log(`  ${path.relative(root, j.out)} ${j.size}x${j.size}`);
	}
}

await optimizeImages();
await generateOg();
await generateIcons();
console.log("Done.");
