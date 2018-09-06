const { app, Menu } = require('electron')
const { BrowserWindow } = require('electron')

let win = null;

app.on('ready', () => {
  win = new BrowserWindow({ width: 800, height: 600 })
  win.loadURL('file://' + __dirname + '/static/index.html');

  app.on('window-all-closed', () => {
    app.quit()
  })
});