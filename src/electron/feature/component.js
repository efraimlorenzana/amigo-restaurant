const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const isDev = require('electron-is-dev');   
const path = require('path');
const { devToolsMenu } = require('../menus/devTools');
const { fileMenu } = require('../menus/file');
const { mealMenu } = require('../menus/menu');
const { getFile, updateFile } = require('./file-system');
const { v4: uuidv4 } = require('uuid');

// let currentWindows = {};

const Form = (window, params, routeURL) => {

    window = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }, ...params
    });

    const startURL = isDev ? `http://localhost:3000${routeURL}` : `file://${path.join(__dirname, "../../../../build/index.html")}`;
 
    window.loadURL(startURL);
 
    window.on('closed', () => {
        window = null;
    });

    // currentWindows[routeURL] = window;
    
    return window;
}

const Menus = (parent) => {
    const menus = Menu.buildFromTemplate([
        fileMenu(app),
        mealMenu(Form, parent),
        devToolsMenu(isDev)
    ]);

    Menu.setApplicationMenu(menus);
}

const MainHub = (parent) => {

    ipcMain.on('menu-newform', (event, args) => {
        let x;
        x = Form(x, { width: 300, height: 200, parent }, args);
        console.log(event, x);
    });

    ipcMain.on('get-menu', async (event, args) => {
        const defData = { menu: [] }
        const data = await getFile(`../data/${args}`, defData);
        
        event.reply('post-menu', data);
    });

    ipcMain.on('add-menu', async (event, args) => {
        const defData = { menu: [] }
        const data = await getFile(`../data/menu.json`, defData);
        const payload = JSON.parse(args);
        const notif = {
            body: `${payload.meal} successfully added`
        }

        try {
            const meal = {
                id: uuidv4(),
                title: payload.meal,
                price: payload.price
            }

            data.menu.push(meal);

            updateFile('../data/menu.json', data);
        } catch (err) {
            notif.body = err.message;
        }

        event.reply('add-menu:status', notif);
    });
}

module.exports = {
    Form,
    Menus,
    app,
    MainHub
}