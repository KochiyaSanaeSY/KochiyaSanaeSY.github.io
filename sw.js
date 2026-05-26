const cacheName = self.location.pathname
const pages = [

  "/docs/%E5%BC%80%E5%8F%91/%E4%B8%8A%E4%BD%8D%E6%9C%BA/",
    "/docs/%E5%BC%80%E5%8F%91/%E4%B8%8B%E4%BD%8D%E6%9C%BA/",
    "/docs/%E5%BC%80%E5%8F%91/%E4%B8%8B%E4%BD%8D%E6%9C%BA/leaf-page-1/",
    "/docs/%E5%BC%80%E5%8F%91/%E4%B8%8B%E4%BD%8D%E6%9C%BA/leaf-page-2/",
    "/docs/%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA/%E4%B8%8A%E4%BD%8D%E6%9C%BA/",
    "/docs/%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA/%E4%B8%8B%E4%BD%8D%E6%9C%BA/",
    "/docs/%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA/",
    "/docs/%E5%BC%80%E5%8F%91/",
    "/posts/blog-post-4/",
    "/tags/blog/",
    "/tags/post/",
    "/tags/",
    "/posts/blog-post-3/",
    "/posts/blog-post-2/",
    "/posts/blog-post-1/",
    "/",
    "/docs/",
    "/posts/",
    "/book.min.7dca40f168e2fd532b7b1937df678e5fcb9289577e924bd85f799138b6137fa6.css",
  "/en.search-data.min.2789335cbc9988a0c575515969463d85edc9996c64a578a0fb1281a938f8f4be.json",
  "/en.search.min.4513b377eddc4ebf902aefdf69ec0843964cce67fa8fe359a2d648cd9826cfe2.js",
  
];

self.addEventListener("install", function (event) {
  self.skipWaiting();

  caches.open(cacheName).then((cache) => {
    return cache.addAll(pages);
  });
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") {
    return;
  }

  /**
   * @param {Response} response
   * @returns {Promise<Response>}
   */
  function saveToCache(response) {
    if (cacheable(response)) {
      return caches
        .open(cacheName)
        .then((cache) => cache.put(request, response.clone()))
        .then(() => response);
    } else {
      return response;
    }
  }

  /**
   * @param {Error} error
   */
  function serveFromCache(error) {
    return caches.open(cacheName).then((cache) => cache.match(request.url));
  }

  /**
   * @param {Response} response
   * @returns {Boolean}
   */
  function cacheable(response) {
    return response.type === "basic" && response.ok && !response.headers.has("Content-Disposition")
  }

  event.respondWith(fetch(request).then(saveToCache).catch(serveFromCache));
});
