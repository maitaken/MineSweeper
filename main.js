const { app, BrowserWindow, Menu } = require('electron')

let mainWin = null;

const setContentSize = function(level){
  let heihgt,width;
  switch(level){
    case "easy":
      [width,heihgt] = [400,350];
    break
    case "normal":
      [width,heihgt] = [600,500];
    break
    case "hard":
    [width,heihgt] = [800,650];
    break
  }
  mainWin.setContentSize(width,heihgt);
}

const setLevel = function (level) {
  if (mainWin != null) {  
    setContentSize(level);
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
  useContentSize: true,
  show:false,
  devTools:false,
  resizable:false
}

app.on('ready', () => {

  mainWin = new BrowserWindow(options)

  mainWin.loadURL(`file://${__dirname}/static/index.html`)

  mainWin.on("show",()=>{
    setLevel("easy")
  })
  mainWin.once('ready-to-show', () => {
    mainWin.show()
  })

  Menu.setApplicationMenu(menu)

});
