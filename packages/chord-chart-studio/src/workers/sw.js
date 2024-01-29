const VERSION = 'v1';
const CACHE_NAME = `chord-chart-studio-${VERSION}`;

const APP_STATIC_RESOURCES = [
	'/',
	'/css/main.css',
	'/css/main.css.map',
	'/favicon.png',
	'/index.html',
	'/main.js',
	'/style.css',
	'/vendors.js',
];

console.log('in service worker');

self.addEventListener('install', (e) => {
	console.log('[Service Worker] Install');
	e.waitUntil(
		(async () => {
			const cache = await caches.open(CACHE_NAME);
			cache.addAll(APP_STATIC_RESOURCES);
		})()
	);
});

self.addEventListener('activate', (e) => {
	console.log('[Service Worker] activate');
	e.waitUntil(
		(async () => {
			const allCacheKeys = await caches.keys();
			await Promise.all(
				allCacheKeys.map((cacheKey) => {
					if (cacheKey !== CACHE_NAME) {
						return caches.delete(cacheKey);
					}
				})
			);
			await clients.claim();
		})()
	);
});

self.addEventListener('fetch', (e) => {
	console.log(`[Service Worker] Fetched resource ${e.request.url}`);
});

self.addEventListener('fetch', (e) => {
	const { request } = e;

	console.log(request);
	// Always bypass for range requests, due to browser bugs
	if (request.headers.has('range')) return;
	e.respondWith(
		(async function () {
			// Try to get from the cache:
			const cachedResponse = await caches.match(request);
			if (cachedResponse) return cachedResponse;

			try {
				// Otherwise, get from the network
				return await fetch(request);
			} catch (err) {
				// If this was a navigation, show the offline page:
				if (request.mode === 'navigate') {
					return caches.match('offline.html');
				}

				// Otherwise throw
				throw err;
			}
		})()
	);
});
