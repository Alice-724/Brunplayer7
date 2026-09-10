const CACHE_NAME = 'loop-music-v1';
const FILES_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './4e82235cae7656cf986204f0af7c1024.JPG' 
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

