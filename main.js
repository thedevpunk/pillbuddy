const { app, BrowserWindow, ipcMain, Notification } = require('electron');
const path = require('path');

const menu = require('./menu.js');

const isDev = !app.isPackaged;

function createWindow() {
   const mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      backgroundColor: "white",
      webPreferences: {
         nodeIntegration: false,
         worldSafeExecuteJavaScript: true,
         contextIsolation: true,
         preload: path.join(__dirname, 'preload.js')
      }
   });

   mainWindow.loadFile('index.html');
}

if (isDev) {
   require('electron-reload')(__dirname, {
      electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
   });
}

ipcMain.on('notify', (event, message) => {
   new Notification({
      title: 'Pillbuddy says',
      body: message
   }).show();
});

app.whenReady().then(createWindow);