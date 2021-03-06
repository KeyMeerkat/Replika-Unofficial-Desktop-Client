// settings.js - Controls app settings
const electron = require('electron');
const path = require('path');
const fs = require('fs');
const log = require('electron-log');
const { ipcMain } = require('electron');
const Store = require('electron-store')

// Log levels: error, warn, info, verbose, debug, silly
function Log (content, level = "info") {
    //log(content, level)
    console.log(content)
}

module.exports = class Themes {
    // This function makes sure the themes directory exists
    verifyFiles() {
        var userDataPath = (electron.app || electron.remote.app).getPath('userData')
        var themesPath = path.join(userDataPath, "themes")

        Log(`THEMES: Themes folder located at ${themesPath}`)

        // Verify themes folder
        Log('THEMES: Verifying themes folder..')
        fs.exists(themesPath, (exists) => {
            if (exists == false) {
                // Create directory
                fs.mkdir(themesPath, (err) => {
                    if (err) {
                        verifyError = true
                        return console.error(`THEMES: Unable to create themes folder -> ${err}`);
                    }
                    Log('THEMES: Themes directory created successfully');
                })
            }
        })


        // Verify that the default theme is installed
        Log('THEMES: Verifying default theme is installed..')
        fs.exists(path.join(themesPath, "modern"), (exists) => {
            if (exists == false) {
                fs.mkdir(path.join(themesPath, 'modern'), (err) => {
                    if (err) {
                        return console.error(`THEMES: Unable to create default theme folder -> ${err}`);
                    }
                    Log('THEMES: Default theme folder created successfully');
                })

                
            }
        })

        // Copy default theme json
        fs.copyFile("themes/modern/config.json", path.join(themesPath, 'modern/config.json'), (err) => {
            if (err) {
                return Log(`THEMES: Unable to copy default theme config -> ${err}`)
            }
            else {
                Log("THEMES: Default theme config loaded onto disk")
            }
        })

        // Copy default theme web stylesheet
        fs.copyFile("themes/modern/modern-web.css", path.join(themesPath, 'modern/modern-web.css'), (err) => {
            if (err) {
                return Log(`THEMES: Unable to copy default theme stylesheet -> ${err}`)
            }
            else {
                Log("THEMES: Default theme stylesheet loaded onto disk")
            }
        })

        // Copy default theme banner
        fs.copyFile("themes/modern/banner.png", path.join(themesPath, 'modern/banner.png'), (err) => {
            if (err) {
                return Log(`THEMES: Unable to copy default theme banner -> ${err}`)
            }
            else {
                Log("THEMES: Default theme banner loaded onto disk")
            }
        })

        Log('THEMES: Themes verification complete!')
    }

    // Get stylesheet file
    getThemeStylesheet(name, type) {
        var userDataPath = (electron.app || electron.remote.app).getPath('userData')
        var themesPath = path.join(userDataPath, 'themes')
        var themePath = path.join(themesPath, name)

        // Config
        var themeConfigFile = 'config.json'
        var configFilePath = path.join(themePath, themeConfigFile)

        // Stylesheets
        var webStylesheetPath = path.join(themePath, (name + '-web.css'))


        // Web app stylesheets
        if (type == 'web') {
            Log(`THEMES: Web stylesheet located at ${webStylesheetPath}`)
            return webStylesheetPath
            
            /* Old code: fs.readFile(configFilePath, 'utf8', function (err, data) {
                if (err) {
                    return Log(err)
                }
                json = data
            })            
            Log('stylesheet' + path.join(themePath, obj.stylesheets.web))

            var obj = JSON.parse(json)*/
        }
    }

    // Get a list of all the themes installed and return a JSON list
    getInstalledThemes() {
        var store = new Store
        var userDataPath = store.get('appDataPath')
        var themesPath = path.join(userDataPath, "themes")
        var themesListJson = {"installedThemes": []}

        // Get all the contents within the themes folder
        var files = fs.readdirSync(themesPath)

        // Loop through each folder (or file) and check if it is a folder
        files.forEach(function (file) {
            if (fs.lstatSync(path.join(themesPath, file)).isDirectory()) {
                // For each theme folder get the config
                var themeConfigData = fs.readFileSync(path.join(themesPath, file, `config.json`));
                var themeConfig = JSON.parse(themeConfigData);

                // Then add it to the themes listing
                themesListJson.installedThemes.push(themeConfig)
            }
        })

        // Return themes list
        //console.log(themesListJson)
        return themesListJson
    }
}