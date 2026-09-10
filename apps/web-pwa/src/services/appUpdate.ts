/**
 * appUpdate.ts - Manejador de actualizaciones para la PWA de Plegueviation Exam
 * Permite forzar la actualización de la caché del Service Worker y recargar la última versión.
 */

export async function forceAppUpdate(): Promise<void> {
  // 1. Limpiar todas las cachés del Service Worker
  if ('caches' in window) {
    try {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
      console.log('[PWA Update] Caché del Service Worker eliminada.');
    } catch (e) {
      console.warn('[PWA Update] Error limpiando CacheStorage:', e);
    }
  }

  // 2. Forzar actualización de todos los registros del Service Worker
  if ('serviceWorker' in navigator) {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const reg of registrations) {
        await reg.update();
      }
      console.log('[PWA Update] Registros de Service Worker actualizados.');
    } catch (e) {
      console.warn('[PWA Update] Error actualizando Service Worker:', e);
    }
  }

  // 3. Forzar recarga con bypass de caché del navegador
  const currentUrl = new URL(window.location.href);
  currentUrl.searchParams.set('t', Date.now().toString());
  window.location.href = currentUrl.toString();
}

/**
 * Comprueba si hay una nueva versión del Service Worker disponible.
 */
export function registerServiceWorkerUpdateListener(onUpdateAvailable: () => void): void {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('[PWA Update] Nueva versión detectada y lista para aplicar.');
              onUpdateAvailable();
            }
          });
        }
      });
    });

    // Comprobar actualización automáticamente cada 15 minutos si hay conexión
    setInterval(() => {
      if (navigator.onLine) {
        navigator.serviceWorker.ready.then((reg) => reg.update().catch(() => {}));
      }
    }, 15 * 60 * 1000);
  }
}
