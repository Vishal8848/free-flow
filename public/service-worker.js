const SITE_CACHE = 'site-cache-v1'

const assets = [ 
    'index.html', 
    'offline.html'
]

this.addEventListener('install', event => {
    event.waitUntil(
        caches.open(SITE_CACHE).then(cache => {
            return cache.addAll(assets)
        })
    )
})

this.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(async () => {
            return fetch(event.request).catch(() => caches.match('offline.html'))
        })
    )
})

this.addEventListener('activate', event => {
    const whitelist = [];
    whitelist.push(SITE_CACHE);

    event.waitUntil(
        caches.keys().then(cacheList => {
            Promise.all(
                cacheList.map(cacheItem => 
                    !cacheList.includes(cacheItem) && caches.delete(cacheItem)
                )
            )
        })
    )
})