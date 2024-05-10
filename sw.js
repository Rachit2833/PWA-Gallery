var CACHE_STATIC_NAME = 'static-v6.1';
var CACHE_DYNAMIC_NAME = 'dynamic-v1';



self.addEventListener('install', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME)
                .map(key => caches.delete(key))
            );
        })
    );

          caches.open(CACHE_STATIC_NAME)
           .then((cache)=>{
            console.log("[Serwicce Worker] Precaching The Shell")
            cache.addAll([
            "/",
            "src/main.jsx",
            "src/Context/Helper.jsx",
            "manifest.json",
            "index.html",
            "index.js",
            "src/index.css",
            "src/favourite/FavouriteLayout.jsx",
            "src/Pages/Home.jsx",
            "src/AppLayout.jsx","src/Pages/AlbumPage.jsx","src/Pages/ProtectedRoute.jsx","src/Pages/Rewind.jsx","src/Rewind/RewindCard.jsx",  "src/Pages/Camera.jsx","src/Rewind/RewindCard.css","src/favourite/Favourite.css","src/PrivateVault/Password.jsx","src/PrivateVault/Privatepage.jsx","src/PrivateVault/Form.css",
             "src/Authentication/Login.jsx",
            "src/Authentication/Login.css",

      
            ])
           })
        })
        

self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request)
            .then(networkResponse => {
                // Clone the network response before caching it
                const clonedResponse = networkResponse.clone();

                // Open the dynamic cache and store the cloned response
                caches.open(CACHE_DYNAMIC_NAME)
                    .then(cache => {
                        cache.put(event.request, clonedResponse);
                    });

                return networkResponse;
            })
            .catch(() => {
                // If network request fails, try to get the response from the cache
                return caches.match(event.request);
            })
    );
});





// self.addEventListener('fetch', event => {
//     event.respondWith(
//         event.respondWith(
//       caches.match(event.request)
//         .then(function (res) {
//           if (res) {
//             return res;
//           } else {
//             return fetch(event.request) .then(function (res) {
//                 return caches.open(CACHE_DYNAMIC_NAME)
//                   .then(function (cache) {
//                     cache.put(event.request.url, res.clone());
//                     return res;
//                   });
//               });
//           }
//         }
//         )));
   
// });

