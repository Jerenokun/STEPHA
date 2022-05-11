const { app, BrowserWindow } = require('electron');
const path = require('path')
// creating the window
function createwindow(){
    let Main_Window = new BrowserWindow({
        minWidth: 1000,
        minHeight: 700,
        width: 1000,
        height: 700,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        },
    });
// loading the html
    Main_Window.loadFile('index.html');
// Removing the menubar. The menubar is basically the "File|Edit|View... parts that you see in something like the task manager"
    Main_Window.removeMenu();
};
// Runnning the app
function run_app() {
    createwindow()
// Minimizing the amount of windows open to one I think
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createwindow()
    });
}

// When the app is ready and everything is good, then it will run the app
app.whenReady().then(run_app)

// Basically quitting the application once all the windows are closed.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});