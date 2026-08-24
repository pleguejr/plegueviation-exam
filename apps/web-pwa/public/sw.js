const CACHE_NAME = 'plegueviation-cache-v2.9';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './favicon.svg',
  './banks/manifest.json',
  './banks/all_questions.json',
  './banks/deleted_questions.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn('SW pre-cache warning:', err);
      });
    }).then(() => self.skipWaiting())
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
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Las llamadas a la API de sincronización nunca se cachean en el Service Worker
  if (event.request.url.includes('/api/')) {
    return;
  }

  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((cached) => {
      if (cached) {
        // En segundo plano, si hay red, refrescar caché de forma silenciosa
        fetch(event.request)
          .then((response) => {
            if (response && response.status === 200) {
              const cacheCopy = response.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, cacheCopy));
            }
          })
          .catch(() => {});
        return cached;
      }

      // Si no estaba en caché, pedir a la red y guardar en caché para uso offline
      return fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const cacheCopy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, cacheCopy));
          }
          return response;
        })
        .catch(async () => {
          // Robustez para iOS / iPadOS: Si falla la red y es una navegación HTML o reinicio tras suspensión
          if (event.request.mode === 'navigate' || event.request.headers.get('accept')?.includes('text/html')) {
            const indexFallback = (await caches.match('./index.html', { ignoreSearch: true })) ||
                                  (await caches.match('/index.html', { ignoreSearch: true })) ||
                                  (await caches.match('./', { ignoreSearch: true }));
            if (indexFallback) return indexFallback;
          }

          // Fallback para archivos estáticos
          const url = new URL(event.request.url);
          const staticFallback = (await caches.match(url.pathname, { ignoreSearch: true })) ||
                                 (await caches.match('.' + url.pathname, { ignoreSearch: true }));
          if (staticFallback) return staticFallback;

          return cached;
        });
    })
  );
});
