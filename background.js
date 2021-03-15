
let notificationDate = new Date(Date.now());
notificationDate.setHours(10, 0, 0);

const interval = setInterval(() => {

  if (new Date(Date.now()) - notificationDate > 0) {

    electron.notificationApi.sendNotification('Hey, es wird Zeit für deine Tablette.');

    electron.customApi.sendNotificationDateResponse(notificationDate);
  }
}, 1000 * 60 * 10);

// ipc communication
electron.customApi.receivePillTaken((pillTaken) => {

  notificationDate.setDate(notificationDate.getDate() + 1);
});

electron.customApi.receiveNotificationDateRequest(() => {

  electron.customApi.sendNotificationDateResponse(notificationDate);
});