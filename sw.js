const CACHE_NAME = 'kampusmarket-pwa-v5';

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
// ПРАВИЛЬНЫЙ ВАРИАНТ
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Кэшируем файлы:', ASSETS);
        return cache.addAll(ASSETS);
      })
      .catch((err) => {
        console.error('Ошибка кэширования:', err);
      })
  );
  self.skipWaiting(); // Чтобы воркер активировался сразу
});
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
