const { app, BrowserWindow } = require('electron');
const path = require('path')
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
    Main_Window.loadFile('index.html');
    Main_Window.removeMenu();
};
function run_app() {
    createwindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createwindow()
    });
}
app.whenReady().then(run_app)
app.on('window-all-closed', () => {
    if (process.platform !== 'drawin') app.quit();
});