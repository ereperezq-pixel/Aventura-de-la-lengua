/* Service worker de El Mundo de Nublo.
   - Archivos de la app (index.html, .js, .css): primero Internet (siempre la última versión)
     y, si no hay conexión, la copia guardada. Así, al subir un archivo nuevo a GitHub se ve enseguida.
   - Resto (iconos, tipografía, confeti): se guardan la primera vez y se usan sin conexión.
   - NO toca el progreso: este vive en localStorage, que este archivo nunca borra.
   Cambia CACHE solo si quieres forzar a vaciar la copia offline. */
const CACHE = 'nublo-v2';
const CORE = [
  './', './index.html', './manifest.webmanifest',
  './styles.css', './fuente-ligada.css',
  './imagenes.js', './pegatinas.js',
  './app.js', './errores.js', './corral.js', './dragones.js', './isla.js', './abn.js', './nublo-libro.js', './diplomas.js', './pwa.js',
  './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png'
];

self.addEventListener('install', e => {
  // Guarda cada archivo por separado: si falta alguno, no se cancela la instalación entera.
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.all(CORE.map(u => c.add(new Request(u, { cache: 'reload' })).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const same = url.origin === location.origin;
  const isPage = req.mode === 'navigate' || (same && (url.pathname.endsWith('/') || url.pathname.endsWith('index.html')));
  const isCode = same && /\.(js|css|webmanifest)$/.test(url.pathname) && !url.pathname.endsWith('/sw.js');

  if (isPage) {
    // Red primero (con tope de 4 s); si falla, la copia guardada.
    e.respondWith((async () => {
      const cache = await caches.open(CACHE);
      try {
        const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 4000);
        const res = await fetch(new Request(req.url, { cache: 'no-cache', signal: ctl.signal }));
        clearTimeout(t);
        if (res && res.ok) { cache.put('./index.html', res.clone()); return res; }
      } catch (err) { /* sin conexión */ }
      return (await cache.match('./index.html')) || (await cache.match(req)) || Response.error();
    })());
    return;
  }

  if (isCode) {
    // Código y estilos de la app: red primero (revalidando), copia guardada si no hay conexión.
    e.respondWith((async () => {
      const cache = await caches.open(CACHE);
      try {
        const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 6000);
        const res = await fetch(new Request(req.url, { cache: 'no-cache', signal: ctl.signal }));
        clearTimeout(t);
        if (res && res.ok) { cache.put(req, res.clone()); return res; }
      } catch (err) { /* sin conexión */ }
      return (await cache.match(req)) || Response.error();
    })());
    return;
  }

  // Resto: copia guardada si existe y se refresca en segundo plano.
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(req);
    const net = fetch(req).then(res => { if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone()); return res; }).catch(() => cached);
    return cached || net;
  })());
});
