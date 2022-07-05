// settings.js - Controls app settings
const electron = require('electron');
const path = require('path');
const fs = require('fs');
const { log } = require('util');

class Themes {
    verifyFiles() {
        // This function makes sure the themes directory exists
        var userDataPath = (electron.app || electron.remote.app).getPath('userData')
        var themesPath = path.join(userDataPath, "themes")

        console.log(`Themes folder: ${themesPath}`)

        // Verify themes folder
        console.log('Verifying themes folder..')
        fs.exists(themesPath, (exists) => {
            if (exists == false) {
                // Create directory
                fs.mkdir(themesPath, (err) => {
                    if (err) {
                        verifyError = true
                        return console.error(err);
                    }
                    console.log('Themes directory created successfully');
                })
            }
        })


        // Verify that the default theme is installed
        console.log('Verifying default theme is installed..')
        fs.exists(path.join(themesPath, "modern"), (exists) => {
            if (exists == false) {
                fs.mkdir(path.join(themesPath, 'modern'), (err) => {
                    if (err) {
                        return console.error(err);
                    }
                    console.log('Modern theme directory created successfully');
                })

                
            }
        })

        // Copy default theme json
        fs.copyFile("themes/modern/modern.json", path.join(themesPath, 'modern/modern.json'), (err) => {
            if (err) {
                return console.log("Error Found:", err)
            }
            else {
                console.log("Default theme config loaded onto disk")
            }
        })

        // Copy default theme web stylesheet
        fs.copyFile("themes/modern/modern-web.css", path.join(themesPath, 'modern/modern-web.css'), (err) => {
            if (err) {
                return console.log("Error Found:", err)
            }
            else {
                console.log("Default theme stylesheet loaded onto disk")
            }
        })

        console.log('Themes verification complete!')
    }


    // Get stylesheet file
    getThemeStylesheet(name, type) {
        var userDataPath = (electron.app || electron.remote.app).getPath('userData')
        var themesPath = path.join(userDataPath, 'themes')
        var themePath = path.join(themesPath, name)

        // Config
        var themeConfigFile = name + '.json'
        var configFilePath = path.join(themePath, themeConfigFile)

        // Stylesheets
        var webStylesheetPath = path.join(themePath, (name + '-web.css'))


        // Web app stylesheets
        if (type == 'web') {
            console.log(`Web stylesheet located at ${webStylesheetPath}`)
            return webStylesheetPath
            
            /* Old code: fs.readFile(configFilePath, 'utf8', function (err, data) {
                if (err) {
                    return console.log(err)
                }
                json = data
            })            
            console.log('stylesheet' + path.join(themePath, obj.stylesheets.web))

            var obj = JSON.parse(json)*/
        }
    }
}

module.exports = Themes