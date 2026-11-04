// Keeps the app working with no signal. Files come from the saved copy right away, then
// refresh in the background, so a new version reaches phones the second time they open the app.
// Shared data (the calendar and the blinds) never goes through here.
const CACHE = 'roost-v2';
const ASSETS = ["./", "config.js", "manifest.webmanifest", "fonts/fonts.css", "fonts/big-shoulders-display-latin-800-normal.woff2", "fonts/big-shoulders-display-latin-900-normal.woff2", "fonts/barlow-latin-400-normal.woff2", "fonts/barlow-latin-500-normal.woff2", "fonts/barlow-latin-600-normal.woff2", "fonts/barlow-latin-700-normal.woff2", "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png"];

// Some web hosts redirect /index.html to /. A browser refuses a saved page that was redirected, so save a clean copy.
const clean = async r => r.redirected
  ? new Response(await r.blob(), {status: r.status, statusText: r.statusText, headers: r.headers})
  : r;

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => Promise.allSettled(ASSETS.map(async a => {
    const r = await fetch(a, {cache: 'no-cache'});
    if (r.ok) await c.put(a, await clean(r));
  }))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith('roost-') && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  const isPage = e.request.mode === 'navigate';
  const key = isPage ? './' : e.request;
  e.respondWith((async () => {
    const c = await caches.open(CACHE);
    const hit = await c.match(key, {ignoreSearch: true});
    const net = fetch(e.request, {cache: 'no-cache'}).then(async r => {
      if (r.ok) await c.put(key, (await clean(r.clone())));
      return r;
    });
    if (hit) { e.waitUntil(net.catch(() => {})); return hit; }
    return net;
  })());
});
