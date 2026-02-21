const CACHE_VERSION = 'jp-travel-talk-tool-v2';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './dist/bundle.js',
  './public/images/page_menu.png',
  './public/images/page_close.png',
  './public/images/play_icon.png',
  './public/images/stop_icon.png',
  './public/icons/icon-192.svg',
  './public/icons/icon-512.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys
      .filter((key) => key !== CACHE_VERSION)
      .map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then((networkResponse) => {
          const shouldCache = networkResponse
            && networkResponse.status === 200
            && event.request.url.startsWith(self.location.origin);

          if (shouldCache) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(event.request, responseClone));
          }

          return networkResponse;
        })
        .catch(() => caches.match('./index.html'));
    })
  );
});
