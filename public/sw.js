const CACHE_STATIC_NAME = "static-v6.2";
const CACHE_DYNAMIC_NAME = "dynamic-v2";
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

// Install event: caching all necessary files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME).then((cache) => {
      console.log("[Service Worker] Precaching the shell");
      return cache.addAll(CACHE_FILES);
    })
  );
});

// Activate event: cleanup old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter(
            (key) => key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME
          )
          .map((key) => caches.delete(key))
      );
    })
  );
  console.log("[Service Worker] Activated");
});

// Fetch event: network first, cache fallback
self.addEventListener("fetch", (event) => {
  // Only cache GET requests
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clone the response and store it in the dynamic cache
        const clonedResponse = response.clone();
        caches.open(CACHE_DYNAMIC_NAME).then((cache) => {
          cache.put(event.request, clonedResponse);
        });
        return response;
      })
      .catch(() => {
        // If network request fails, attempt to serve from cache
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // Optional: return a fallback page for offline scenarios
          return caches.match("/offline.html");
        });
      })
  );
});
