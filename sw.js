var cacheName = 'kankor-pwa';
var filesToCache = [
  '/',
  '/index.html',
  '/css/main.css',
  '/js/main.js',
	'/js/materialize.min.js',
	'/dbs/db.json',
  '/dbs/subjectDB.json',
	'/dbs/pages.json'
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
