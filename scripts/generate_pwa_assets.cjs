const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// CRC32 table
const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) c = 0xedb88320 ^ (c >>> 1);
    else c = c >>> 1;
  }
  crcTable[n] = c >>> 0;
}

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function createChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);

  const toCrc = Buffer.concat([typeBuf, data]);
  const crcVal = crc32(toCrc);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crcVal, 0);

  return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
}

function generatePng(size) {
  const width = size;
  const height = size;

  // Raw image data: height rows, each row has 1 filter byte + width * 4 bytes (RGBA)
  const rowSize = 1 + width * 4;
  const raw = Buffer.alloc(height * rowSize);

  const cx = width / 2;
  const cy = height / 2;
  const rBg = size * 0.44;

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    raw[rowOffset] = 0; // Filter type 0 (None)

    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Check if inside rounded square / circle background
      // Soft dark slate background (#0f172a)
      let r = 15, g = 23, b = 42, a = 255;

      if (dist <= rBg) {
        // Medical cross or Heart shape
        const inCrossV = Math.abs(dx) <= size * 0.12 && Math.abs(dy) <= size * 0.32;
        const inCrossH = Math.abs(dy) <= size * 0.12 && Math.abs(dx) <= size * 0.32;

        if (inCrossV || inCrossH) {
          // Teal-Emerald color (#14b8a6)
          r = 20; g = 184; b = 166; a = 255;
        } else {
          // Inner circle border glow (#0d9488)
          r = 13; g = 148; b = 136; a = 200;
        }
      } else {
        // Outside circular badge: transparent or dark
        a = 0;
      }

      raw[pxOffset] = r;
      raw[pxOffset + 1] = g;
      raw[pxOffset + 2] = b;
      raw[pxOffset + 3] = a;
    }
  }

  const compressed = zlib.deflateSync(raw);

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type: RGBA
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdrChunk = createChunk('IHDR', ihdr);
  const idatChunk = createChunk('IDAT', compressed);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

const publicDir = path.resolve(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Generate PNGs
fs.writeFileSync(path.join(publicDir, 'icon-192.png'), generatePng(192));
fs.writeFileSync(path.join(publicDir, 'icon-512.png'), generatePng(512));
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), generatePng(180));

// Generate SVG
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#134e4a" />
    </linearGradient>
    <linearGradient id="crossGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2dd4bf" />
      <stop offset="100%" stop-color="#14b8a6" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="128" fill="url(#bgGrad)"/>
  <circle cx="256" cy="256" r="190" fill="#0f766e" opacity="0.3"/>
  <!-- Cross / Heart symbol -->
  <rect x="216" y="116" width="80" height="280" rx="20" fill="url(#crossGrad)"/>
  <rect x="116" y="216" width="280" height="80" rx="20" fill="url(#crossGrad)"/>
  <!-- Central pulse dot -->
  <circle cx="256" cy="256" r="28" fill="#ffffff" />
</svg>`;

fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgContent, 'utf8');

// Generate manifest.json
const manifest = {
  id: "/",
  start_url: "/",
  scope: "/",
  name: "SantéNova — Portail Patient & Soignant",
  short_name: "SantéNova",
  description: "Portail santé numérique tout-en-un pour patientes, soignants et hôpitaux. Fonctionne hors-ligne sur smartphone, tablette et PC.",
  display: "standalone",
  orientation: "portrait-primary",
  theme_color: "#0d9488",
  background_color: "#020617",
  categories: ["medical", "health", "productivity"],
  icons: [
    {
      src: "/icon-192.png",
      sizes: "192x192",
      type: "image/png",
      purpose: "any"
    },
    {
      src: "/icon-512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "any"
    },
    {
      src: "/icon.svg",
      sizes: "any",
      type: "image/svg+xml",
      purpose: "any"
    }
  ]
};

fs.writeFileSync(path.join(publicDir, 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');

// Generate sw.js (Service Worker for offline support)
const swContent = `// Service Worker SantéNova PWA - Offline First
const CACHE_NAME = 'santenova-cache-v2.1';
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/icon.svg'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS).catch((err) => {
        console.warn('Pre-cache error (non fatal):', err);
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  // Stale-While-Revalidate strategy for app shell and navigation
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // If offline and request is HTML navigation, return cached index
          if (event.request.headers.get('accept')?.includes('text/html')) {
            return caches.match('/index.html') || cachedResponse;
          }
          return cachedResponse;
        });

      return cachedResponse || fetchPromise;
    })
  );
});
`;

fs.writeFileSync(path.join(publicDir, 'sw.js'), swContent, 'utf8');

console.log('✅ PWA Assets Generated successfully in public/: manifest.json, sw.js, icon-192.png, icon-512.png, apple-touch-icon.png, icon.svg');
