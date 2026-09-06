// Converts a TTF/OTF into a three.js typeface JSON (facetype format).
// Usage: node scripts/typeface.mjs <font.ttf> <out.json> [chars]
import fs from "node:fs";
import opentype from "opentype.js";

const [, , input, output, extraChars = ""] = process.argv;
if (!input || !output) {
	console.error("usage: node scripts/typeface.mjs <font.ttf> <out.json> [chars]");
	process.exit(1);
}

const CHARS =
	"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 !?.,'-" +
	"àáâäãåçèéêëìíîïñòóôöõùúûüýÿœæßÀÁÂÄÃÅÇÈÉÊËÌÍÎÏÑÒÓÔÖÕÙÚÛÜŒÆ" +
	extraChars;

const buf = fs.readFileSync(input);
const font = opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
const scale = 1000 / font.unitsPerEm;
const round = (n) => Math.round(n * scale);

const glyphs = {};
for (const ch of new Set(CHARS)) {
	const glyph = font.charToGlyph(ch);
	if (!glyph || glyph.index === 0 && ch !== " ") continue;
	const path = glyph.getPath(0, 0, font.unitsPerEm);
	const parts = [];
	for (const c of path.commands) {
		switch (c.type) {
			case "M":
				parts.push(`m ${round(c.x)} ${round(-c.y)}`);
				break;
			case "L":
				parts.push(`l ${round(c.x)} ${round(-c.y)}`);
				break;
			case "Q":
				parts.push(`q ${round(c.x)} ${round(-c.y)} ${round(c.x1)} ${round(-c.y1)}`);
				break;
			case "C":
				parts.push(
					`b ${round(c.x)} ${round(-c.y)} ${round(c.x1)} ${round(-c.y1)} ${round(c.x2)} ${round(-c.y2)}`,
				);
				break;
			case "Z":
				break;
		}
	}
	glyphs[ch] = {
		ha: round(glyph.advanceWidth),
		x_min: round(glyph.xMin ?? 0),
		x_max: round(glyph.xMax ?? 0),
		o: parts.join(" "),
	};
}

const json = {
	glyphs,
	familyName: font.names.fontFamily?.en ?? "Font",
	ascender: round(font.ascender),
	descender: round(font.descender),
	underlinePosition: round(font.tables.post?.underlinePosition ?? -100),
	underlineThickness: round(font.tables.post?.underlineThickness ?? 50),
	boundingBox: {
		yMin: round(font.tables.head.yMin),
		xMin: round(font.tables.head.xMin),
		yMax: round(font.tables.head.yMax),
		xMax: round(font.tables.head.xMax),
	},
	resolution: 1000,
	original_font_information: { format: 0 },
};

fs.writeFileSync(output, JSON.stringify(json));
console.log(`${Object.keys(glyphs).length} glyphs -> ${output} (${(fs.statSync(output).size / 1024).toFixed(1)} KB)`);
