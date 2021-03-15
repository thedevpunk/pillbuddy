const { app, BrowserWindow, ipcMain, Notification } = require('electron');
const path = require('path');

const menu = require('./menu.js');

const isDev = !app.isPackaged;

let mainWindow;
let backgroundTaskWindow;

let isMainWindowActive = false;

function createWindow() {
   mainWindow = new BrowserWindow({
      title: 'Pillbuddy',
      width: 600,
      height: 400,
      backgroundColor: "white",
      webPreferences: {
         nodeIntegration: false,
         worldSafeExecuteJavaScript: true,
         contextIsolation: true,
         backgroundThrottling: true,
         preload: path.join(__dirname, 'preload.js')
      }
   });

   mainWindow.on('close', () => {
      isMainWindowActive = false;
   });

   isMainWindowActive = true;
   mainWindow.loadFile('index.html');

}

function createBackgroundTaskWindow() {
   backgroundTaskWindow = new BrowserWindow({
      title: 'background',
      width: 400,
      height: 225,
      show: false,
      webPreferences: {
         nodeIntegration: false,
         worldSafeExecuteJavaScript: true,
         contextIsolation: true,
         backgroundThrottling: false,
         preload: path.join(__dirname, 'preload.js')
      }
   });

   backgroundTaskWindow.loadFile('background.html');
}

if (isDev) {
   require('electron-reload')(__dirname, {
      electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
   });
}



// app events
app.whenReady().then(() => {
   createWindow();
   createBackgroundTaskWindow();
   // mainWindow.webContents.openDevTools();
   // backgroundTaskWindow.webContents.openDevTools();
});

app.on('window-all-closed', () => {
   if (process.platform !== 'darwin') {
      app.quit();
   }
});

app.on('activate', () => {
   if (BrowserWindow.getAllWindows().length === 1) {
      createWindow();
   }
});

// ipc communication
ipcMain.on('notify', (event, message) => {
   new Notification({
      title: 'Pillbuddy says',
      body: message,
      icon: path.join(__dirname, './static/pill.png')
   }).show();
});

ipcMain.on('pill-taken', (event, isTaken) => {
   backgroundTaskWindow.webContents.send('pill-taken', isTaken);
});

ipcMain.on('notification-date-request', (event) => {
   backgroundTaskWindow.webContents.send('notification-date-request');
});

ipcMain.on('notification-date-response', (event, date) => {
   
   if (isMainWindowActive) {
      mainWindow.webContents.send('notification-date-response', date);
   }
});

