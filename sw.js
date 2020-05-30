var cacheName = 'kankor-pwa';
var filesToCache = [
  '/kankor/',
  '/kankor/index.html',
  '/kankor/css/main.css',
  '/kankor/js/main.js',
  '/kankor/js/materialize.min.js',
  '/kankor/dbs/db.json',
  '/kankor/dbs/subjectDB.json',
  '/kankor/dbs/pages.json'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});
/* update */

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
