// Keeps the app working with no signal. Files come from the saved copy right away, then refresh in the background.
// When a new version arrives, open screens reload onto it, so nobody keeps working in an old copy.
// Shared data (the calendar and the blinds) never goes through here.
const SCOPE = self.registration.scope;
const CACHE = 'roost-4dc83a3316:' + SCOPE;
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
  const ready = (async () => {
    const keys = await caches.keys();
    // Only this folder's old copies. The first version used one plain name.
    const old = keys.filter(k => k !== CACHE && (k.endsWith(':' + SCOPE) || (k === 'roost-v2' && SCOPE.endsWith('/app/'))));
    await Promise.all(old.map(k => caches.delete(k)));
    await self.clients.claim();
    return old.length > 0;
  })();
  e.waitUntil(ready);
  // Not inside waitUntil: a page can't finish loading until this worker is done activating, so waiting on it here would hang forever.
  ready.then(updated => {
    if (updated) self.clients.matchAll({type: 'window'}).then(open => open.forEach(c => c.navigate(c.url).catch(() => {})));
  });
});

// Map photos: saved ones come straight off the phone, so the map works with no signal. New ones are saved as they load.
// Kept in their own store, which an app update never clears.
const TILES = 'roost-tiles';
let saved = 0;
async function tile(req) {
  const c = await caches.open(TILES);
  const hit = await c.match(req.url, {ignoreVary: true});
  if (hit) return hit;
  try {
    const r = await fetch(req.url, {mode: 'cors', credentials: 'omit'});
    if (r.ok) {
      await c.put(req.url, r.clone());
      if (++saved % 50 === 0) c.keys().then(k => Promise.all(k.slice(0, Math.max(0, k.length - 3000)).map(x => c.delete(x)))); // Oldest go first.
    }
    return r;
  } catch (err) {
    return fetch(req).catch(() => Response.error()); // If the photo server ever stops allowing saves, the map still shows its photos.
  }
}

self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method === 'GET' && u.hostname === 'basemap.nationalmap.gov') { e.respondWith(tile(e.request)); return; }
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
