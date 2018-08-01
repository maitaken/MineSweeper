const electron = require('electron')
const { app, Menu } = require('electron')
const BrowserWindow = electron.BrowserWindow;


const setLevel = function (level) {
  console.log(level)
  switch (level) {
    case "easy":
      win.webContents.send('change-level', 8)
      win.setSize(210, 230)
      break
    case "normal":
      win.webContents.send('change-level', 15)
      win.setSize(380, 400)
      break
    case "hard":
      win.webContents.send('change-level', 20)
      win.setSize(500, 520)
      break
  }
}

let win = null;

app.on('ready', () => {

  win = new BrowserWindow();


  const template = [
    {
      label: 'Mode',
      submenu: [
        {

          label: 'easy',
          type: 'radio',
          checked: true,
          click: setLevel("easy")
        },
        {
          label: 'normal',
          type: 'radio',
          click: setLevel("normal")
        },
        {
          label: 'hard',
          type: 'radio',
          click: setLevel("hard")
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      role: 'window',
      submenu: [
        { role: 'minimize' },
        { role: 'close' }
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click() { require('electron').shell.openExternal('https://electronjs.org') }
        }
      ]
    }
  ]
  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services', submenu: [] },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    })
  }
  win.loadURL('file://' + __dirname + '/static/index.html');
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

  // setLevel("easy")


  app.on('window-all-closed', () => {
    app.quit()
  })
});