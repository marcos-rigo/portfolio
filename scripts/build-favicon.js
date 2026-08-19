// One-off script: strip the baked-in checkerboard "transparency" pattern from
// logo rigo.jpg (a JPEG has no alpha channel, so the transparency preview grid
// got flattened into real pixels) and rebuild a genuinely transparent favicon.ico.
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const SRC = "C:/Users/marco/OneDrive/Escritorio/logo rigo.jpg";
const OUT_DIR = path.join(__dirname, "..", "public", "img");
const TMP_PNG = path.join(OUT_DIR, "logo-rigo-transparent.png");
const OUT_ICO = path.join(OUT_DIR, "favicon.ico");

async function main() {
  const image = sharp(SRC).ensureAlpha();
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  const idx = (x, y) => (y * width + x) * channels;

  // Checkerboard = near-grayscale (R~G~B) pixel in the light range. Logo
  // colors (navy #0E2440-ish, red #D81F2A-ish, and the shaded white core
  // circle which sits inside a red ring) never touch the image border, so a
  // flood fill seeded at the border can only ever consume checker squares.
  const isCheckerish = (r, g, b) => {
    const maxc = Math.max(r, g, b);
    const minc = Math.min(r, g, b);
    return maxc - minc <= 12 && r >= 175 && r <= 255;
  };

  const visited = new Uint8Array(width * height);
  const queue = new Int32Array(width * height);
  let qHead = 0;
  let qTail = 0;

  const pushIfChecker = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const p = y * width + x;
    if (visited[p]) return;
    const o = idx(x, y);
    if (isCheckerish(data[o], data[o + 1], data[o + 2])) {
      visited[p] = 1;
      queue[qTail++] = p;
    }
  };

  for (let x = 0; x < width; x++) {
    pushIfChecker(x, 0);
    pushIfChecker(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    pushIfChecker(0, y);
    pushIfChecker(width - 1, y);
  }

  while (qHead < qTail) {
    const p = queue[qHead++];
    const x = p % width;
    const y = (p / width) | 0;
    pushIfChecker(x + 1, y);
    pushIfChecker(x - 1, y);
    pushIfChecker(x, y + 1);
    pushIfChecker(x, y - 1);
  }

  for (let p = 0; p < width * height; p++) {
    if (visited[p]) {
      data[idx(p % width, (p / width) | 0) + 3] = 0;
    }
  }

  // Re-encode as PNG; sharp's Lanczos resampling on resize (below) already
  // anti-aliases the cut edge, so no separate feather pass is needed.
  const feathered = await sharp(data, { raw: { width, height, channels } })
    .png({ compressionLevel: 9, palette: false })
    .toBuffer();

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(TMP_PNG, feathered);

  const sizes = [16, 32, 48, 64];
  const pngBuffers = await Promise.all(
    sizes.map((s) =>
      sharp(feathered).resize(s, s, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer()
    )
  );

  writeIco(pngBuffers, sizes, OUT_ICO);
  console.log("Wrote", OUT_ICO);
  console.log("Wrote", TMP_PNG);
}

function writeIco(pngBuffers, sizes, outPath) {
  const count = pngBuffers.length;
  const headerSize = 6 + count * 16;
  let offset = headerSize;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);

  const dirEntries = [];
  for (let i = 0; i < count; i++) {
    const size = sizes[i];
    const buf = pngBuffers[i];
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(buf.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += buf.length;
    dirEntries.push(entry);
  }

  fs.writeFileSync(outPath, Buffer.concat([header, ...dirEntries, ...pngBuffers]));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
