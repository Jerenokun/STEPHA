const { app, BrowserWindow } = require("electron");
const path = require("path");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
    // eslint-disable-line global-require
    app.quit();
}

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        minWidth: 1000,
        minHeight: 700,
        width: 1100,
        height: 700,
        fullscreen: true,
        icon: __dirname + "/assets/stepha_icon.icns",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    // loading the html
    mainWindow.loadFile("src/index.html");
    // Removing the menubar. The menubar is basically the "File|Edit|View... parts that you see in something like the task manager"
    mainWindow.setMenuBarVisibility(false)
};


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
