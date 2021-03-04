function receivePushNotification(event) {
  console.log("[Service Worker] Push Received.");

  const { image, tag, url, title, text } = event.data.json();

  const options = {
    data: url,
    body: text,
    icon: image,
    vibrate: [200, 100, 200],
    tag: tag,
    image: image,
    badge: "https://raw.githubusercontent.com/iwishiwasaneagle/boxofhope/727450f52530bccb12662ee6d208488c465d8637/cmask-gh-pages/public/img/icons/logo192.png",
    actions: [{ action: "Detail", title: "View", icon: "https://raw.githubusercontent.com/iwishiwasaneagle/boxofhope/727450f52530bccb12662ee6d208488c465d8637/cmask-gh-pages/public/img/icons/logo192.png" }]
  };
  event.waitUntil(self.registration.showNotification(title, options));
}

function openPushNotification(event) {
  console.log("[Service Worker] Notification click Received.", event.notification.data);
  
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data));
}

self.addEventListener("push", receivePushNotification);
self.addEventListener("notificationclick", openPushNotification);