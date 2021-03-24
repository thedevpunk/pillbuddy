const Store = require('electron-store');

let hours = 10;
let minutes = 0;
let seconds = 0;

const createNewNotificationDate = () => {
  let notificationDate = new Date(Date.now());
  notificationDate.setHours(hours, minutes, seconds);
  store.set('notification-date', notificationDate);
};

const store = new Store();

let notificationDate = store.get('notification-date');

// Initializing - no date in store
if (notificationDate === undefined) {
  createNewNotificationDate();
}

// Date in store is before now
if (new Date(date.now()) - notificationDate > 0) {
  createNewNotificationDate();
}

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