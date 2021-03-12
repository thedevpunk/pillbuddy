const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
   const mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      backgroundColor: "white",
      webPreferences: {
         nodeIntegration: false,
         worldSafeExecuteJavaScript: true,
         contextIsolation: true
      }
   });

   mainWindow.loadFile('index.html');
}

require('electron-reload')(__dirname, {
   electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
});

app.whenReady().then(createWindow);