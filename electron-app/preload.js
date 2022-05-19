// When the BrowserView DOM content is loaded, inject CSS/JavaScript
const { webContents } = require('electron');
const fs = require('fs');

window.addEventListener('DOMContentLoaded', () => {
    // Basic replace text function
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }    
})

window.webContents.on('did-finish-load', () => {
    fs.readFile("themes/modern.css", 'utf8', function (err, data) {
        if (err) {
            return console.log(err)
        }
        webContents.fromId(3782).insertCSS(data)
    })
})