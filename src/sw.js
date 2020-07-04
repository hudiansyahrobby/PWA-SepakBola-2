const CACHE_NAME = "infootball-v2";
const urlsToCache = [
  "./nav.html",
  "./index.html",
  "./article.html",
  "./manifest.json",
  "./article.js",
  "./index.js",
  "./pages/home.html",
  "./pages/saved.html",
  "./pages/standing.html",
  "./pages/topscore.html",
  "./assets/images/icons/ball.png",
  "./assets/images/jumbotron.jpg",
  "./assets/images/icons/icon192x192.png",
  "./assets/images/icons/icon512x512.png",
];

// Add or Install Cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch Cache
self.addEventListener("fetch", (event) => {
  const base_url = "https://api.football-data.org/";
  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return fetch(event.request).then((response) => {
          cache.put(event.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true }).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName != CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("push", function (event) {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }
  const options = {
    body: body,
    icon: "/src/assets/images/icons/icon192x192.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };
  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});
