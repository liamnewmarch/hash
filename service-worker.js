const CACHE_VERSION = 2;

const CACHE_URLS = [
  '',
  'app.css',
  'app.js',
];

self.addEventListener('activate', (event) => {
  event.waitUntil(async () => {
    const cacheVersions = await caches.keys();
    for (const cacheVersion of cacheVersions) {
      if (cacheVersion !== CACHE_VERSION) {
        await caches.delete(cacheVersion);
      }
    }
    const cache = await caches.open(CACHE_VERSION);
    return cache.addAll(CACHE_URLS);
  });
});

self.addEventListener('fetch', (event) => {
  event.waitUntil(async (event) => {
    return await caches.match(event.request) || await fetch(event.request);
  });
});
