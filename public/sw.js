importScripts("../idb.js");

const CACHE_STATIC_NAME = "static-v6.6";
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
function convertImageToDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result); // This will be the Data URL
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file); // Convert the file to a Data URL
  });
}
const idbPromise=idb.open('share-store',1,function(db){
  if (!db.objectStoreNames.contains("shared-images")) {
    db.createObjectStore("shared-images", {
      keyPath: "id",
      autoIncrement: true,
    });
  }
   
})

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

// service-worker.js

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  if (event.request.method !== "POST" || url.pathname !== "/share") {
    return; // Not a POST request to /share, ignore it.
  }

  event.respondWith(
    (async () => {
      try {
        // Get the form data from the request.
        const formData = await event.request.formData();
        const imageFiles = formData.getAll("images"); // Get the actual file objects.

        console.log(imageFiles,"image files");
        imageFiles.map(async (item)=>{
              const dataUrl= await convertImageToDataURL(item)
              console.log(dataUrl);
              idbPromise.then(function(db){
                  var tx = db.transaction("shared-images",'readwrite');
                  var store = tx.objectStore("shared-images");
                  store.put({ id: Date.now(), dataUrl: dataUrl });
                  return tx.complete;
              })
        })
        // Return a success response.
        return Response.redirect("/", 303);
      } catch (error) {
        return new Response("Error processing files", {
          headers: { "Content-Type": "text/plain" },
        });
      }
    })()
  );
});