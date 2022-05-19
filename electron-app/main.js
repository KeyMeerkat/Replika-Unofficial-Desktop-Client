// Inport modules
const { app, BrowserWindow, BrowserView, ipcMain, screen } = require('electron')
const path = require('path')
const fs = require('fs')

// Create browser window
const createWindow = () => {
    global.win = new BrowserWindow({
        // Note: Any changes to window width/height should be updated in 'main.css'
        width: 400,
        height: 700,
        maximizable: false,
        minimizable: true,
        resizable: false,
        frame: false,
        radii: [8, 8, 8, 8],
        transparent: true,
        closable: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })

    // Remove the menu bar
    win.removeMenu();

    // Set the window position
    let display = screen.getPrimaryDisplay();
    let width = display.bounds.width;
    let height = display.bounds.height;
    win.setPosition(((width - 400) - 50), ((height - 700) - 50), false)

    // Load html code that controls the custom window
    win.loadFile('pages/index.html')


    // Load the Replika web interface
    const view = new BrowserView()
    win.setBrowserView(view)
    view.setBounds({ x: 1, y: 40, width: 398, height: 660 })
    view.webContents.loadURL('https://my.replika.com/')

    // Inject custom CSS (themes)
    view.webContents.on('did-finish-load', () => {
        fs.readFile("themes/modern-adaptive.css", 'utf8', function (err, data) {
            if (err) {
                return console.log(err)
            }
            view.webContents.insertCSS(data)
        })
    })
}

// Quit the app when all windows are closed (Windows & Linux)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

// Open a window if none are open (macOS). The window will still open in Windows.
app.whenReady().then(() => {
    // Create a windowW
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Activate custom window buttons
ipcMain.on('close', () => {
    app.quit()
})
ipcMain.on('minimize', () => {
    //BrowserView.getFocusedWindow().minimize();
    global.win.minimize();
})
