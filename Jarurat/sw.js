let CACHE_STATIC_NAME = "static-v1.0";
let CACHE_DYNAMIC_NAME = "dynamic-v1.0";

self.addEventListener("install", (event) => {
  caches.open(CACHE_STATIC_NAME).then((cache) => {
    console.log("[Serwicce Worker] Precaching The Shell");
    cache.addAll([
        //cache all the static files Not able to do this because cannot find git repository
    ]);
  });
});


self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
         //Cloning the dynamic data and fetching it to cache for offline use
        const clonedResponse = networkResponse.clone();
        caches.open(CACHE_DYNAMIC_NAME).then((cache) => {
          cache.put(event.request, clonedResponse);
        });
        return networkResponse;
      })
      .catch(() => {
         //If network fails data will be returned from cache memory
        return caches.match(event.request);
      })
  );
});

//for code to work the please link the Jarurat file  to main HTML Page