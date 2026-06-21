const CACHE_NAME = 'girmaic-helper-v1';
const PRE_CACHE = [
  '/',
  '/index.html',
  '/manifest.json'
];

// On installation, pre-cache the core application shells
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Girmaic SW] Pre-caching core application shell');
        return cache.addAll(PRE_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// Clean up old caches on activation
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('[Girmaic SW] Deleting obsolete cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Dynamic intercept and response routing
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests (e.g. POST, PUT)
  if (request.method !== 'GET') {
    return;
  }

  // Skip API queries which require fresh network data (or proxy endpoints)
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request).catch(() => {
        return new Response(JSON.stringify({ 
          error: "You are currently offline. Please check your internet connectivity to complete active database requests.",
          offline: true 
        }), {
          headers: { 'Content-Type': 'application/json' }
        });
      })
    );
    return;
  }

  // Cache-First strategy for static assets, scripts, stylesheets, and fonts
  // Network-First strategy for pages / documents (to ensure user views fresh data)
  const isStaticAsset = 
    url.pathname.includes('/assets/') || 
    url.pathname.endsWith('.js') || 
    url.pathname.endsWith('.css') || 
    url.pathname.endsWith('.png') || 
    url.pathname.endsWith('.jpg') || 
    url.pathname.endsWith('.svg') || 
    url.pathname.endsWith('.json') || 
    url.pathname.endsWith('.woff') || 
    url.pathname.endsWith('.woff2');

  if (isStaticAsset) {
    event.respondWith(
      caches.match(request).then(cachedResponse => {
        if (cachedResponse) {
          // Serve immediately and refresh in background (stale-while-revalidate)
          fetch(request).then(networkResponse => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then(cache => cache.put(request, networkResponse));
            }
          }).catch(() => {/* Ignore background sync error when offline */});
          
          return cachedResponse;
        }

        // Fetch and add to cache
        return fetch(request).then(networkResponse => {
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse;
          }
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, responseToCache));
          return networkResponse;
        }).catch(() => {
          // Serve placeholder offline image if requested resource was an image
          if (request.headers.get('Accept') && request.headers.get('Accept').includes('image')) {
            return new Response('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="#121212"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#E5D3B3" font-size="10">Offline Asset</text></svg>', {
              headers: { 'Content-Type': 'image/svg+xml' }
            });
          }
        });
      })
    );
  } else {
    // For general route redirects (HTML Pages) or deep links, do Network-First with Cache fallback
    event.respondWith(
      fetch(request)
        .then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(request, responseToCache));
          }
          return networkResponse;
        })
        .catch(() => {
          return caches.match(request).then(cachedResponse => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // Fallback to primary index document
            return caches.match('/');
          });
        })
    );
  }
});
