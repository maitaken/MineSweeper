const { app, BrowserWindow, Menu } = require('electron')

let mainWin = null;

const setLevel = function (level) {
  if (mainWin != null) {
    mainWin.webContents.send('set-level', level);
  }
}


let template = [
  {
    label: 'Detail',
    submenu: [
      {
        label: "詳細",
        click: () => {
          require('electron').shell.openExternal('https://github.com/maitaken/MineSweeper')
        }
      }
    ]
  },
  {
    label: 'Level',
    submenu: [
      {
        label: "Easy",
        type: 'radio',
        checked: true,
        click: () => {
          setLevel("easy")
        }
      },
      {
        label: "Normal",
        type: 'radio',
        click: () => {
          setLevel("normal")
        }

      },
      {
        label: "Hard",
        type: 'radio',
        click: () => {
          setLevel("hard")
        }
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

let menu = Menu.buildFromTemplate(template)

let options = {
}

app.on('ready', () => {

  mainWin = new BrowserWindow({
    options
  })

  Menu.setApplicationMenu(menu)

  mainWin.webContents.openDevTools()

  mainWin.loadURL(`file://${__dirname}/static/index.html`)
});