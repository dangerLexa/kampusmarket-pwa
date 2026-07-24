const CACHE_NAME = 'kampusmarket-pwa-v1';

const ASSETS = [
  'index.html',
  'otz.html',
  'registr.html',
  'list.html',
  'manifest.json',
  'style.css',
  'icon-192.png',
  'icon-512.png',
  '111.jfif',
  '222.jpg',
  '333.jpg',
  '444.jpg',
  '555.jpg',
  '666.jpg',
  '777.jfif',
  '888.jpg',
  '999.jfif'
];
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
