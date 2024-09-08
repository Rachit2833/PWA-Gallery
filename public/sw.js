const CACHE_STATIC_NAME = "static-v6.1";
const CACHE_DYNAMIC_NAME = "dynamic-v1";
const CACHE_FILES = [
  "/",
  "/index.html",
  "/manifest.json",
  "/src/main.jsx",
  "/src/Context/Helper.jsx",
  "/src/index.css",
  "/src/favourite/FavouriteLayout.jsx",
  "/src/Pages/Home.jsx",
  "/src/AppLayout.jsx",
  "/src/Pages/AlbumPage.jsx",
  "/src/Pages/ProtectedRoute.jsx",
  "/src/Pages/Rewind.jsx",
  "/src/Rewind/RewindCard.jsx",
  "/src/Pages/Camera.jsx",
  "/src/Rewind/RewindCard.css",
  "/src/favourite/Favourite.css",
  "/src/PrivateVault/Password.jsx",
  "/src/PrivateVault/Privatepage.jsx",
  "/src/PrivateVault/Form.css",
  "/src/Authentication/Login.jsx",
  "/src/Authentication/Login.css",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_STATIC_NAME)
      .then((cache) => {
        console.log("[Service Worker] Precaching The Shell");
        return cache.addAll(CACHE_FILES);
      })
      .then(() => {
        return caches.keys();
      })
      .then((keys) => {
        return Promise.all(
          keys
            .filter(
              (key) => key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME
            )
            .map((key) => caches.delete(key))
        );
      })
      .catch((error) => {
        console.error("[Service Worker] Cache installation failed:", error);
      })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached response if available
      if (cachedResponse) {
        return cachedResponse;
      }
      // Fetch from network if not in cache
      return fetch(event.request)
        .then((networkResponse) => {
          // Clone and cache the network response
          const clonedResponse = networkResponse.clone();
          caches.open(CACHE_DYNAMIC_NAME).then((cache) => {
            cache.put(event.request, clonedResponse);
          });
          return networkResponse;
        })
        .catch(() => {
          // Optional: return a fallback page for offline scenarios
          return caches.match("/offline.html"); // Ensure you have an offline.html in your cache
        });
    })
  );
});

// Optional: Clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => {
        return Promise.all(
          keys
            .filter(
              (key) => key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME
            )
            .map((key) => caches.delete(key))
        );
      })
      .then(() => {
        console.log(
          "[Service Worker] Activating new service worker and clearing old caches"
        );
      })
      .catch((error) => {
        console.error("[Service Worker] Cache cleanup failed:", error);
      })
  );
});

