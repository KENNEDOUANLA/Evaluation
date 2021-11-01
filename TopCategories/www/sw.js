//ajouter le composant tache id ou/et face id
const VERSION = 2;
const CACHE_NAME = "offline_v" + VERSION;
const OFFLINE_URL = "/Html/offline.html";
const ORIGIN_URL = `${location.protocol}//${location.host}`;
const CACHED_FILES = [
    OFFLINE_URL,
    `${ORIGIN_URL}/css/style.css`,
    `${ORIGIN_URL}/js/index.js`,
    `${ORIGIN_URL}/img/logos/logo50x50.png`,

];

// SW install

self.addEventListener('install', (event) => {
    event.waitUntil(new Promise((resolve) => {
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(CACHED_FILES).then(resolve);
        })
    }));

    self.skipWaiting();
})

// SW fetch

self.addEventListener('fetch', (event) => {
    if (event.request.mode === "navigate") {
        event.respondWith(new Promise((resolve) => {
            event.preloadResponse.then((preloadResponse) => {
                if (preloadResponse) {
                    resolve(preloadResponse);
                }
                fetch(event.request).then((networkResponse) => {
                    resolve(networkResponse);
                }).catch(() => {
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.match(OFFLINE_URL).then((cacheResponse) => {
                            resolve(cacheResponse)
                        });
                    });
                });
            }).catch(() => {
                caches.open(CACHE_NAME).then((cache) => {
                    cache.match(OFFLINE_URL).then((cacheResponse) => {
                        resolve(cacheResponse);
                    });
                });
            });
        }));

    } else if (CACHED_FILES.includes(event.request.url)) {
        event.respondWith(caches.match(event.request));
    }
})

//SW Activate
//delete cache
const deleteOldCaches = () =>
    new Promise((resolve) => {
        caches.keys().then((keys) => {
            Promise.all(keys.map((key) => {
                if (key !== CACHE_NAME) {

                    caches.delete(key);
                }
            })).finally(resolve)
        });
    });

self.addEventListener('activate', (event) => {
    event.waitUntil(new Promise((resolve) => {
        deleteOldCaches().then(() => {
            if ("navigationPreload" in self.registration) {
                self.registration.navigationPreload.enable().finally(resolve);
            }
        });
    }));

    self.clients.claim();

})