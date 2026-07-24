const CACHE_NAME = 'kampusmarket-pwa-v6';

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
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Открыли кэш, начинаем кэширование...');
        return cache.addAll(ASSETS); 
      })
      .then(() => {
        console.log('Файлы успешно закэшированы!');
        return self.skipWaiting(); 
      })
      .catch((err) => {
        console.error('Ошибка при установке воркера:', err);
        throw err;
      })
  );
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
