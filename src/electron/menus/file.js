const fileMenu = (app) => ({
    label: "File",
    submenu: [
        {
            label: "Close",
            accelerator: "CmdOrCtrl+Q",
            click() {
                app.quit();
            }
        }
    ]
});

module.exports = {fileMenu};