const { app, BrowserWindow } = require("electron");
const path = require("path");
// creating the window
function createwindow() {
    let mainwin = new BrowserWindow({
        minWidth: 1000,
        minHeight: 700,
        width: 1000,
        height: 700,
        icon: __dirname + "/assets/stepha_icon.png",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    // loading the html
    mainwin.loadFile("index.html");
    // Removing the menubar. The menubar is basically the "File|Edit|View... parts that you see in something like the task manager"
}
// Runnning the app
function run_app() {
    createwindow();
    // For MACOS: To avoid any problems in creating windows when the dock icon is clicked
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createwindow();
    });
}
// When the app is ready and everything is good, then it will run the app
app.whenReady().then(run_app);

// Basically quitting the application once all the windows are closed.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});
