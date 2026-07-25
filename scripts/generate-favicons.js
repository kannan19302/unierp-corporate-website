const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Helper to write PNG file from raw RGBA buffer
function createPngBuffer(width, height, getPixel) {
  const rowSize = width * 4 + 1; // 1 byte filter type per row
  const rawData = Buffer.alloc(height * rowSize);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter type 0 (None)
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = getPixel(x, y, width, height);
      const pxOffset = rowOffset + 1 + x * 4;
      rawData[pxOffset] = r;
      rawData[pxOffset + 1] = g;
      rawData[pxOffset + 2] = b;
      rawData[pxOffset + 3] = a;
    }
  }

  const compressedData = zlib.deflateSync(rawData);

  function makeChunk(type, data) {
    const lenBuf = Buffer.alloc(4);
    lenBuf.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const typeAndData = Buffer.concat([typeBuf, data]);
    const crc = zlib.crc32(typeAndData);
    const crcBuf = Buffer.alloc(4);
    crcBuf.writeUInt32BE(crc >>> 0, 0);
    return Buffer.concat([lenBuf, typeAndData, crcBuf]);
  }

  // PNG Signature
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  // IHDR Chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;  // Bit depth
  ihdrData[9] = 6;  // Color type RGBA
  ihdrData[10] = 0; // Compression
  ihdrData[11] = 0; // Filter
  ihdrData[12] = 0; // Interlace
  const ihdrChunk = makeChunk('IHDR', ihdrData);

  // IDAT Chunk
  const idatChunk = makeChunk('IDAT', compressedData);

  // IEND Chunk
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// Helper to create ICO file containing PNG image
function createIcoBuffer(pngBuffer, width, height) {
  const icoHeader = Buffer.alloc(6);
  icoHeader.writeUInt16LE(0, 0); // Reserved
  icoHeader.writeUInt16LE(1, 2); // Image type (1 = ICO)
  icoHeader.writeUInt16LE(1, 4); // Number of images

  const icoDir = Buffer.alloc(16);
  icoDir[0] = width >= 256 ? 0 : width;
  icoDir[1] = height >= 256 ? 0 : height;
  icoDir[2] = 0; // Color palette
  icoDir[3] = 0; // Reserved
  icoDir.writeUInt16LE(1, 4); // Color planes
  icoDir.writeUInt16LE(32, 6); // Bits per pixel
  icoDir.writeUInt32LE(pngBuffer.length, 8); // Size of image data
  icoDir.writeUInt32LE(22, 12); // Offset to image data (6 + 16 = 22)

  return Buffer.concat([icoHeader, icoDir, pngBuffer]);
}

// Marketing Icon Pixel Generator (Cyan to Blue theme)
function getMarketingPixel(x, y, w, h) {
  const nx = x / (w - 1);
  const ny = y / (h - 1);

  // Rounded corner container
  const cornerR = 0.22;
  const dx = Math.max(0, Math.abs(nx - 0.5) - (0.5 - cornerR));
  const dy = Math.max(0, Math.abs(ny - 0.5) - (0.5 - cornerR));
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist > cornerR) return [0, 0, 0, 0];

  // Background gradient: slate/dark #0f172a to vibrant blue glow
  let bgR = 15, bgG = 23, bgB = 42;
  const glow = 1 - Math.hypot(nx - 0.3, ny - 0.3);
  if (glow > 0) {
    bgR = Math.min(255, Math.floor(bgR + glow * 40));
    bgG = Math.min(255, Math.floor(bgG + glow * 100));
    bgB = Math.min(255, Math.floor(bgB + glow * 180));
  }

  // Draw U-Shape in center
  const cx = nx - 0.5;
  const cy = ny - 0.5;

  // Left pillar: cx approx -0.22, cy from -0.25 to 0.1
  const isLeftPillar = Math.abs(cx + 0.2) < 0.09 && cy >= -0.25 && cy <= 0.1;
  // Right pillar: cx approx 0.22, cy from -0.25 to 0.1
  const isRightPillar = Math.abs(cx - 0.2) < 0.09 && cy >= -0.25 && cy <= 0.1;
  // Bottom arch: cx from -0.2 to 0.2, cy near 0.1 to 0.25
  const archDist = Math.abs(Math.hypot(cx, cy - 0.1) - 0.2);
  const isBottomArch = archDist < 0.09 && cy >= 0.05;

  // Center node diamond
  const isCenterNode = Math.abs(cx) + Math.abs(cy + 0.12) < 0.12;

  if (isLeftPillar || isRightPillar || isBottomArch) {
    // Gradient #38bdf8 (cyan) to #2563eb (blue)
    const t = ny;
    const r = Math.floor(56 * (1 - t) + 37 * t);
    const g = Math.floor(189 * (1 - t) + 99 * t);
    const b = Math.floor(248 * (1 - t) + 235 * t);
    return [r, g, b, 255];
  }

  if (isCenterNode) {
    return [255, 255, 255, 255];
  }

  return [bgR, bgG, bgB, 255];
}

// Admin Icon Pixel Generator (Indigo to Violet theme with Shield accent)
function getAdminPixel(x, y, w, h) {
  const nx = x / (w - 1);
  const ny = y / (h - 1);

  // Rounded corner container
  const cornerR = 0.22;
  const dx = Math.max(0, Math.abs(nx - 0.5) - (0.5 - cornerR));
  const dy = Math.max(0, Math.abs(ny - 0.5) - (0.5 - cornerR));
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist > cornerR) return [0, 0, 0, 0];

  // Background dark #0b0f19
  let bgR = 11, bgG = 15, bgB = 25;

  const cx = nx - 0.5;
  const cy = ny - 0.5;

  // Outer Shield shape check
  // Top edge at cy = -0.3, point at bottom cy = 0.32
  const shieldWidth = 0.35 * (1 - Math.max(0, (cy - 0.0) / 0.35));
  const inShield = cy >= -0.32 && cy <= 0.32 && Math.abs(cx) <= shieldWidth;

  if (inShield) {
    // Admin Indigo gradient #818cf8 -> #6366f1 -> #4338ca
    const t = (cy + 0.32) / 0.64;
    let r = Math.floor(129 * (1 - t) + 67 * t);
    let g = Math.floor(140 * (1 - t) + 56 * t);
    let b = Math.floor(248 * (1 - t) + 202 * t);

    // Inner White U Emblem
    const isLeftP = Math.abs(cx + 0.11) < 0.05 && cy >= -0.15 && cy <= 0.08;
    const isRightP = Math.abs(cx - 0.11) < 0.05 && cy >= -0.15 && cy <= 0.08;
    const isArch = Math.abs(Math.hypot(cx, cy - 0.08) - 0.11) < 0.05 && cy >= 0.05;
    const isCrown = Math.hypot(cx, cy + 0.18) < 0.05;

    if (isLeftP || isRightP || isArch) {
      return [255, 255, 255, 255];
    }
    if (isCrown) {
      return [224, 132, 252, 255]; // Violet accent dot
    }

    return [r, g, b, 255];
  }

  return [bgR, bgG, bgB, 255];
}

// Generate all assets
const publicDir = path.join(__dirname, '..', 'public');
const appDir = path.join(__dirname, '..', 'app');
const adminDir = path.join(__dirname, '..', 'app', 'admin');

if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

// 1. Marketing PNGs & ICO
const mkt32 = createPngBuffer(32, 32, getMarketingPixel);
const mkt180 = createPngBuffer(180, 180, getMarketingPixel);
const mktIco = createIcoBuffer(mkt32, 32, 32);

fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), mkt32);
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), mkt180);
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), mktIco);
fs.writeFileSync(path.join(appDir, 'favicon.ico'), mktIco);

// 2. Admin PNGs & ICO
const admin32 = createPngBuffer(32, 32, getAdminPixel);
const admin180 = createPngBuffer(180, 180, getAdminPixel);
const adminIco = createIcoBuffer(admin32, 32, 32);

fs.writeFileSync(path.join(publicDir, 'admin-favicon-32x32.png'), admin32);
fs.writeFileSync(path.join(publicDir, 'admin-apple-touch-icon.png'), admin180);
fs.writeFileSync(path.join(publicDir, 'admin-favicon.ico'), adminIco);
fs.writeFileSync(path.join(adminDir, 'favicon.ico'), adminIco);

console.log('Successfully generated all marketing and admin favicon PNG & ICO assets!');
