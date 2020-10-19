const { Form, Menus, app, MainHub } = require('./feature/component');
 
let mainWindow;
 
const createWindow = () => {

    mainWindow = Form(mainWindow, { show: false, height: 600, width: 1000 }, "/");
    mainWindow.once('ready-to-show', () => mainWindow.show());
    //mainWindow.webContents.openDevTools();
}

app.on('ready', () => {
    Menus(mainWindow);
    createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

MainHub(mainWindow);