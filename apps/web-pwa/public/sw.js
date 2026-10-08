const CACHE_NAME = 'plegueviation-cache-v3.5.5';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './favicon.svg',
  './banks/manifest.json',
  './banks/all_questions.json',
  './banks/deleted_questions.json',
  './sop-diagrams/flow-emergencia-comandante.svg',
  './sop-diagrams/briefing-prep-vuelo.svg',
  './sop-diagrams/briefing-lvo-lvto.svg',
  './sop-diagrams/briefing-twin-autoland.svg',
  './sop-diagrams/visual-approach-fig.jpg',
  './sop-diagrams/circling-approach-fig.jpg',
  './sop-diagrams/npa-gps-rnav-fig.jpg',
  './sop-diagrams/ils-precision-fig.jpg',
  './sop-diagrams/oei-ils-fig.jpg',
  './sop-diagrams/oei-approach-fig.jpg',
  './sop-diagrams/oei-circling-approach-fig.jpg',
  './sop-diagrams/oei-npa-fig.jpg',
  './sop-diagrams/no-slat-flap-landing-fig.jpg',
  './sop-diagrams/powerbanks-normativa-2026-fig.jpg',
  './sop-diagrams/emg-engine-fail-driftdown.svg',
  './sop-diagrams/emg-emergency-descent.svg',
  './sop-diagrams/emg-reject-takeoff-rto.svg',
  './sop-diagrams/emg-tcas-ra.svg',
  './sop-diagrams/emg-windshear.svg',
  './sop-diagrams/emg-egpws-terrain.svg',
  './sop-diagrams/special-engine-start-apu-inop.svg',
  './sop-diagrams/special-arrival-apu-inop.svg',
  './sop-diagrams/netjets-fuel-decision-flow.svg',
  './sop-diagrams/netjets-approach-ban-lvo.svg',
  './sop-diagrams/netjets-rvsm-contingency.svg',
  './sop-diagrams/netjets-crm-owner-dilemma.svg'
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
