// Cache pro práci offline a ukládání statických souborů.
const CACHE_NAME = "knpts-v4";
const CACHE_PREFIX = "knpts-";
const base = self.registration.scope;
const cacheAssets = [
    base,
    new URL("index.html", base).href,
    new URL("score.html", base).href,
    new URL("style.css", base).href,
    new URL("index.js", base).href,
    new URL("score.js", base).href,
    new URL("db.js", base).href,
    new URL("manifest.json", base).href,
    new URL("icon192.png", base).href,
    new URL("icon512.png", base).href
];

// Při instalaci uložíme potřebné soubory do cache.
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(cacheAssets))
            .then(() => self.skipWaiting())
    );
});

// Při aktivaci odstraníme pouze starší cache této aplikace.
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys()
            .then(names => Promise.all(names
                .filter(name => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME)
                .map(name => caches.delete(name))))
            .then(() => self.clients.claim())
    );
});

// Ostatní požadavky obsloužíme z cache nebo ze sítě.
self.addEventListener("fetch", event => {
    const request = event.request;
    const url = new URL(request.url);

    if (request.method !== "GET" || url.origin !== self.location.origin) return;

    event.respondWith((async () => {
        const cache = await caches.open(CACHE_NAME);

        // Navigace používá síť jako první a při výpadku nabídne uloženou stránku.
        if (request.mode === "navigate") {
            try {
                const response = await fetch(request);
                if (response.ok) {
                    event.waitUntil(cache.put(request, response.clone()).catch(() => {}));
                }
                return response;
            } catch (error) {
                const cachedPage = await cache.match(request) || await cache.match(new URL("index.html", base).href);
                if (cachedPage) return cachedPage;
                return new Response("Offline", {
                    status: 503,
                    headers: { "Content-Type": "text/plain; charset=utf-8" }
                });
            }
        }

        // U statických souborů upřednostníme cache.
        const cached = await cache.match(request);
        if (cached) return cached;

        try {
            const response = await fetch(request);
            if (response.ok && response.type !== "opaque" && response.status !== 206) {
                event.waitUntil(cache.put(request, response.clone()).catch(() => {}));
            }
            return response;
        } catch (error) {
            return new Response("Resource unavailable offline", {
                status: 503,
                headers: { "Content-Type": "text/plain; charset=utf-8" }
            });
        }
    })());
});
