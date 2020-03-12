const CACHE_VERSION = '3';

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
    for (const cacheVersion of await caches.keys()) {
      if (cacheVersion !== CACHE_VERSION) {
        console.log('deleting', cacheVersion, CACHE_VERSION);
        await caches.delete(cacheVersion);
      }
    }
  },
  async fetch(event) {
    try {
      return await caches.match(event.request) || await fetch(event.request);
    } catch (error) {
      return caches.match('/');
    }
  },
  async install() {
    const cache = await caches.open(CACHE_VERSION);
    console.log('install');
    return cache.addAll(CACHE_URLS);
  },
};

self.addEventListener('activate', (event) => {
  event.waitUntil(CACHE_STRATEGY.activate(event));
});

self.addEventListener('install', (event) => {
  event.waitUntil(CACHE_STRATEGY.install(event));
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(CACHE_STRATEGY.fetch(event));
});
