//pro práci offline a ukládání do cache
    
const CACHE_NAME = "v3";
const cacheAssets = [
    '/',
    '/index.html',
    '/score.html',
    '/style.css',
    '/index.js',
    '/score.js',
    '/db.js',
    '/icon192.png',
    '/icon512.png'
];
    
self.addEventListener("install", event => {
    event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
        return cache.addAll(cacheAssets);
    })
    );
});
    
self.addEventListener("activate", event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
    caches.keys().then(cacheNames => {
        return Promise.all(
        cacheNames.map(cacheName => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
            }
        })
        );
    })
    );
});
    
self.addEventListener("fetch", event => {
    // ostatní soubory
    event.respondWith(
        //cacheujeme pouze podle url a ignorujeme parametry v url
        caches.match(event.request, {ignoreSearch: true}).then(response => {
            // Pokud je odpověď v cache, vrátíme ji
            if (response) {
                return response;
            }
            // Jinak se pokusíme načíst ji ze sítě
            return fetch(event.request).then(networkResponse => {
                // Klonování odpovědi kvůli přidání do cache
                const responseClone = networkResponse.clone();
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, responseClone);
                });
                return networkResponse;
            });
        }).catch(() => {
            // Zobrazení náhradní stránky, pokud ani cache, ani síť nejsou dostupné
            //return caches.match('/offline.html');
            console.log("Offline and no cache");
        })
    );
});