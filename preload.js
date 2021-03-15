const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  notificationApi: {
    sendNotification(message) {

      ipcRenderer.send('notify', message);
    }
  },
  customApi: {
    sendPillTaken(isTaken) {

      ipcRenderer.send('pill-taken', isTaken);
    },
    receivePillTaken(func) {

      ipcRenderer.on('pill-taken', (event, pillTaken) => {
        func(pillTaken);
      });
    },
    sendNotificationDateRequest() {

      ipcRenderer.send('notification-date-request');
    },
    receiveNotificationDateRequest(func) {

      ipcRenderer.on('notification-date-request', (event) => {
        func();
      });
    },
    sendNotificationDateResponse(date) {

      ipcRenderer.send('notification-date-response', date);
    },
    receiveNotificationDateResponse(func) {

      ipcRenderer.on('notification-date-response', (event, date) => {
        func(date);
      });
    }
  }
});


