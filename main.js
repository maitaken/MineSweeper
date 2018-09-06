const { app, BrowserWindow } = require('electron')

let win = null;

let options = {

}

app.on('ready', () => {

  win = new BrowserWindow({
    options
  })

  win.loadURL(`file://${__dirname}/static/index.html`)
});