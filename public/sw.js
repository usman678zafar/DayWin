const CACHE_NAME = "daywin-v2";
const STATIC_ASSETS = [
    "/",
    "/manifest.json",
    "/icons/icon-192x192.png",
    "/icons/icon-512x512.png",
];

// Install event - cache static assets
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(async (cache) => {
            const requests = await Promise.all(
                STATIC_ASSETS.map(async (asset) => {
                    try {
                        const response = await fetch(asset, { cache: "no-cache" });
                        if (response.ok) {
                            await cache.put(asset, response);
                        }
                    } catch (error) {
                        // Ignore install-time cache failures so the worker still activates.
                    }
                })
            );
            return requests;
        })
    );
    self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            );
        })
    );
    self.clients.claim();
});

// Fetch event - network first, fallback to cache
self.addEventListener("fetch", (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== "GET") return;

    // Only handle same-origin http(s) requests. Browser extensions and other
    // custom schemes cannot be stored in the Cache API.
    if (url.origin !== self.location.origin) return;
    if (url.protocol !== "http:" && url.protocol !== "https:") return;

    // Skip API requests - always go to network
    if (request.url.includes("/api/")) return;

    event.respondWith(
        fetch(request)
            .then((response) => {
                // Cache only successful basic responses.
                if (!response.ok || response.type !== "basic") {
                    return response;
                }

                const responseClone = response.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(request, responseClone).catch(() => {
                        // Ignore cache write failures so navigation still succeeds.
                    });
                });
                return response;
            })
            .catch(() => {
                // Fallback to cache
                return caches.match(request).then((cachedResponse) => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    // Return offline page for navigation requests
                    if (request.mode === "navigate") {
                        return caches.match("/");
                    }
                    return new Response("Offline", { status: 503 });
                });
            })
    );
});

// Handle push notifications
self.addEventListener("push", (event) => {
    const data = event.data?.json() || {};
    const title = data.title || "Day Win";
    const options = {
        body: data.body || "Time to check your habits!",
        icon: "/icons/icon-192x192.png",
        badge: "/icons/icon-96x96.png",
        vibrate: [100, 50, 100],
        data: {
            url: data.url || "/dashboard",
        },
        actions: [
            { action: "open", title: "Open App" },
            { action: "dismiss", title: "Dismiss" },
        ],
    };

    event.waitUntil(self.registration.showNotification(title, options));
});

// Handle notification click
self.addEventListener("notificationclick", (event) => {
    event.notification.close();

    const url = event.notification.data?.url || "/dashboard";

    event.waitUntil(
        self.clients
            .matchAll({ type: "window", includeUncontrolled: true })
            .then((clientList) => {
                // Focus existing window if open
                for (const client of clientList) {
                    if (client.url.includes("/dashboard") && "focus" in client) {
                        return client.focus();
                    }
                }
                // Open new window
                return self.clients.openWindow(url);
            })
    );
});
