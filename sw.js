const CACHE_STATIC = 'static-v1';
const CACHE_INMUTABLE = 'inmutable-v1';

const URL = self.location.href
let ruta = '';
URL.startsWith('https:') ? ruta = '/pwa-MAPS-u2-p7/' : ruta = "/"

self.addEventListener('install', (event) => {
    console.log('SW instalado');

    const cacheStatic = caches.open(CACHE_STATIC)
        .then(cache => {
            cache.addAll([
                `${ruta}`,
                `${ruta}index.html`,
                `${ruta}manifest.json`,
                `${ruta}images/avatar.png`,
                `${ruta}js/camera.js`,
                `${ruta}js/app.js`,
                `${ruta}images/icons/android-launchericon-48-48.png`,
                `${ruta}images/icons/android-launchericon-72-72.png`,
                `${ruta}images/icons/android-launchericon-96-96.png`,
                `${ruta}images/icons/android-launchericon-144-144.png`,
                `${ruta}images/icons/android-launchericon-192-192.png`,
                `${ruta}images/icons/android-launchericon-512-512.png`,
                `${ruta}css/style.css`
            ]);
        });

    const cacheInmutable = caches.open(CACHE_INMUTABLE)
        .then(cache => {
            cache.addAll([
                'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css',
                'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.min.js',
                'https://cdn.jsdelivr.net/npm/sweetalert2@11'
            ]);
        });

    event.waitUntil(Promise.all([cacheStatic, cacheInmutable]));

});

self.addEventListener('fetch', (event) => {
    event.respondWith(caches.match(event.request));
})