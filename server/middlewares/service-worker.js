self.addEventListener('install', (event) => {
  console.log('Service Worker installed');
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activated');
});

self.addEventListener('message', (event) => {
    event.waitUntil(
      self.registration.showNotification(event.data.title, {
        body: event.data.body,
        icon: event.data.icon
      })
    );
    self.addEventListener('notificationclick', (notificationEvent) => {
      notificationEvent.notification.close();
      clients.openWindow(`${event.data.webAddress}/homePage`);
    })
});
