const CACHE_VERSION = 1;

const CACHE_URLS_LOCAL = [
  '',
  'app.css',
  'app.js',
];

const CACHE_URLS_CDN = [
  'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/md5.js',
  'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/sha1.js',
  'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/sha256.js',
  'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/sha512.js',
];

self.addEventListener('activate', (event) => {
  event.waitUntil(async () => {
    const cache = await caches.open(CACHE_VERSION);
    return cache.addAll([
      ...LOCAL_FILES,
      ...CDN_FILES,
    ]);
  });
})

self.addEventListener('fetch', (event) => {
  event.waitUntil(async (event) => {
    return await caches.match(event.request) || await fetch(event.request);
  });
})
