/*
 * Generates the PWA PNG icons from scratch — no image dependencies.
 * Draws the Signals mark (a signal head with a lit green lamp) on the dark
 * background, full-bleed so it also works as a maskable icon.
 *
 *   node scripts/generate-icons.mjs
 */
import { deflateSync } from 'node:zlib'
import { writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public')

const hex = (h) => [
  parseInt(h.slice(1, 3), 16),
  parseInt(h.slice(3, 5), 16),
  parseInt(h.slice(5, 7), 16),
]
const BG = hex('#0b0f14')
const HEAD = hex('#0c1116')
const GREEN = hex('#1fc457')
const YELLOW_DIM = hex('#584618')
const RED_DIM = hex('#581917')

function render(size) {
  const buf = Buffer.alloc(size * size * 3)
  const s = size / 512 // design is authored at 512
  const put = (x, y, [r, g, b]) => {
    if (x < 0 || y < 0 || x >= size || y >= size) return
    const i = (y * size + x) * 3
    buf[i] = r
    buf[i + 1] = g
    buf[i + 2] = b
  }
  const fillRect = (x0, y0, x1, y1, c) => {
    for (let y = Math.round(y0); y < Math.round(y1); y++)
      for (let x = Math.round(x0); x < Math.round(x1); x++) put(x, y, c)
  }
  const disc = (cx, cy, rad, c) => {
    for (let y = Math.round(cy - rad); y <= cy + rad; y++)
      for (let x = Math.round(cx - rad); x <= cx + rad; x++)
        if ((x - cx) ** 2 + (y - cy) ** 2 <= rad * rad) put(x, y, c)
  }

  fillRect(0, 0, size, size, BG)
  fillRect(176 * s, 84 * s, 336 * s, 428 * s, HEAD)
  disc(256 * s, 164 * s, 54 * s, GREEN)
  disc(256 * s, 256 * s, 54 * s, YELLOW_DIM)
  disc(256 * s, 348 * s, 54 * s, RED_DIM)
  return buf
}

// --- Minimal PNG encoder (RGB, 8-bit, no alpha) ---
function crc32(buf) {
  let c = ~0
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i]
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1))
  }
  return ~c >>> 0
}
function chunk(type, data) {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length)
  const typeBuf = Buffer.from(type, 'ascii')
  const body = Buffer.concat([typeBuf, data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(body))
  return Buffer.concat([len, body, crc])
}
function png(size, rgb) {
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(size, 0)
  ihdr.writeUInt32BE(size, 4)
  ihdr[8] = 8 // bit depth
  ihdr[9] = 2 // colour type: truecolour (RGB)
  // scanlines with filter byte 0
  const stride = size * 3
  const raw = Buffer.alloc((stride + 1) * size)
  for (let y = 0; y < size; y++) {
    raw[y * (stride + 1)] = 0
    rgb.copy(raw, y * (stride + 1) + 1, y * stride, y * stride + stride)
  }
  const idat = deflateSync(raw, { level: 9 })
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', idat),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

mkdirSync(OUT, { recursive: true })
for (const size of [192, 512]) {
  writeFileSync(join(OUT, `pwa-${size}.png`), png(size, render(size)))
  console.log(`wrote public/pwa-${size}.png`)
}
