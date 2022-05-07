const { app, BrowserWindow } = require('electron')

app.whenReady().then(
  function () {
    let Main_Window = new BrowserWindow({
      width: 500,
      height: 500
    });
    Main_Window.loadFile('index.html');
    Main_Window.removeMenu();
  }
)