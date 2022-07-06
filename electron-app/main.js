// Inport modules
const { app, BrowserWindow, BrowserView, ipcMain, screen } = require('electron')
const path = require('path')
const fs = require('fs')
const Store = require('electron-store')
const Themes = require('./themes')
let mainWindow;

// Initilize settings object and set defaults if needed
const store = new Store()
if (!store.has('defaultTheme')) {
    store.set('defaultTheme', 'modern')
    console.log('STORE: Created value "defaultTheme".')
}

// Set the current theme to the default if user has not selected one
if (!store.has('selectedTheme')) {
    store.set('selectedTheme', 'modern')
    console.log('STORE: Created value "selectedTheme".')
}



// Create browser window
const createWindow = () => {
    global.win = new BrowserWindow({
        // Note: Any changes to window width/height should be updated in 'main.css'
        width: 400,
        height: 704,
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

    // Verify themes
    const themes = new Themes
    themes.verifyFiles()
    
    // Wait 3 seconds to allow files to be created if needed
    const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));
    sleep(3000).then(() => {        

        // Load the Replika web interface
        const view = new BrowserView()
        win.setBrowserView(view)
        view.setBounds({ x: 1, y: 40, width: 398, height: 660 })
        view.webContents.loadURL('https://my.replika.com/')

        // Inject custom CSS (themes)
        view.webContents.on('did-finish-load', () => {
            var theme = store.get('defaultTheme')
            // Get theme
            if (store.get('selectedTheme')) {
                theme = store.get('selectedTheme')
            }

            // Get stylesheet and apply it
            fs.readFile(themes.getThemeStylesheet(theme, "web"), 'utf8', function (err, data) {
                if (err) {
                    return console.log(`THEMES: Error loading theme -> ${err}`)
                }

                view.webContents.insertCSS(data)
                console.log(`THEMES: CSS injected`)
            })
        })

    });
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
