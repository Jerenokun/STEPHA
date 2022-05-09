const { app, BrowserWindow } = require('electron')

app.whenReady().then(
  function () {
    let Main_Window = new BrowserWindow({
      width: 1000,
      height: 700
    });
    Main_Window.loadFile('index.html');
    Main_Window.removeMenu();
  }
)