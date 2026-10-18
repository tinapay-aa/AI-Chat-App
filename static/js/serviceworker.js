self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('projectsite-cache-v1').then(function(cache) {
            return cache.addAll([
                '/',

                '/static/css/style.css',
                '/static/js/app.js',

                '/static/img/background-veil.png',
                '/static/img/background2.jpg',
                '/static/img/logo.png',
            ]);
        })
    );
});

self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })
    );
});