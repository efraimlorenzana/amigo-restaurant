
const devToolsMenu = isDev => ({
    label: "Developer Tools",
    submenu: [
        isDev && {
            label: "Toggle Developer Tools",
            accelerator: "CmdOrCtrl+Shift+I",
            click(item, focusedWindow) {
                focusedWindow.toggleDevTools();
            }
        },
        {   
            label: "Refresh",
            role: 'reload'
        }
    ]
});

module.exports = {devToolsMenu};