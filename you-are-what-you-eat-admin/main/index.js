const { join } = require("path");
const { BrowserWindow, app, ipcMain } = require("electron");
const serveNext = require("next-electron-server");


// Register your own scheme and host
serveNext("next://app");


app.whenReady().then(async () => {
  const mainWindow = new BrowserWindow({
    width: 1600,
    height: 900,
    webPreferences: {
      nodeIntegration: false,
      preload: join(__dirname, "preload.js"),
    },
  });

  // Load renderer using a custom protocol:

  mainWindow.loadURL("next://app");
});

// Quit the app once all windows are closed
app.on("window-all-closed", app.quit);

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on("message", (event, message) => {
  event.sender.send("message", message);
});