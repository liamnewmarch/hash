const CACHE_VERSION = 3;

const CACHE_URLS = [
  '.',
  'app.css',
  'app.js',
  'images/icon-48.png',
  'images/icon-72.png',
  'images/icon-96.png',
  'images/icon-144.png',
  'images/icon-192.png',
  'images/icon-512.png',
  'index.html',
];

const CACHE_STRATEGY = {
  async activate() {
    const cacheVersions = await caches.keys();
    for (const cacheVersion of cacheVersions) {
      if (cacheVersion !== CACHE_VERSION) {
        await caches.delete(cacheVersion);
      }
    }
    const cache = await caches.open(CACHE_VERSION);
    return cache.addAll(CACHE_URLS);
  },
  async fetch(event) {
    return await caches.match(event.request) || await fetch(event.request);
  },
};

self.addEventListener('activate', (event) => {
  event.waitUntil(CACHE_STRATEGY.activate(event));
});

self.addEventListener('fetch', (event) => {
  event.waitUntil(CACHE_STRATEGY.fetch(event));
});
