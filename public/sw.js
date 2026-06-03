const CACHE_NAME = "inout-pwa-v1";

// Cache static bundle assets and fonts
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/icon.png",
  "/icon.svg",
  "/manifest.json"
];

// Install Event
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Static assets being pre-cached successfully");
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event - clean up obsolete caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("[Service Worker] Removing obsolete cache storage:", key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Stale-While-Revalidate for app assets, and Network-First for APIs
self.addEventListener("fetch", (event) => {
  // Only process HTTP/HTTPS GET requests
  if (event.request.method !== "GET" || !event.request.url.startsWith("http")) {
    return;
  }

  const reqUrl = new URL(event.request.url);

  // If fetching local app endpoints or static resources
  if (reqUrl.origin === self.location.origin) {
    // For API requests, always try Network First, fallback to cache
    if (reqUrl.pathname.startsWith("/api/")) {
      event.respondWith(
        fetch(event.request)
          .then((networkResponse) => {
            // Cache successful API responses
            if (networkResponse && networkResponse.status === 200) {
              try {
                if (!networkResponse.bodyUsed) {
                  const responseToCache = networkResponse.clone();
                  caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache).catch(() => {});
                  });
                }
              } catch (cloneErr) {
                console.warn("[Service Worker] API response clone skipped:", cloneErr);
              }
            }
            return networkResponse;
          })
          .catch(() => {
            // Offline fallback for APIs
            return caches.match(event.request).then((cachedResponse) => {
              if (cachedResponse) {
                return cachedResponse;
              }
              // Return off-line error JSON
              return new Response(
                JSON.stringify({ 
                  error: "Internet aloqasi mavjud emas", 
                  offline: true,
                  recommendations: [] 
                }),
                { headers: { "Content-Type": "application/json" } }
              );
            });
          })
      );
    } else {
      // Stale-While-Revalidate pattern for local static assets
      event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
          const fetchPromise = fetch(event.request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              try {
                if (!networkResponse.bodyUsed) {
                  const responseToCache = networkResponse.clone();
                  caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache).catch(() => {});
                  });
                }
              } catch (cloneErr) {
                console.warn("[Service Worker] Static response clone skipped:", cloneErr);
              }
            }
            return networkResponse;
          }).catch(() => null);

          if (cachedResponse) {
            // Tell the browser to keep the Service Worker alive to complete background caching
            if (fetchPromise) {
              event.waitUntil(fetchPromise);
            }
            return cachedResponse;
          }

          return fetchPromise;
        })
      );
    }
  }
});
