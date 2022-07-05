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