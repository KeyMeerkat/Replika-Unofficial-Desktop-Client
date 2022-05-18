// When the BrowserView DOM content is loaded, inject CSS/JavaScript
window.addEventListener('DOMContentLoaded', () => {
    // Basic replace text function
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    // Inject a custom stylesheet as found in the themes folder
    const body = document.body;
    var style = document.createElement('style')
    style.innerHTML = File("themes/modern.css")
    body.appendChild(style)

    
})

window.webContents.on('did-start-loading', () => {
    const body = document.body;
    var style = document.createElement('style')
    style.innerHTML = File("themes/modern.css")
    body.appendChild(style)
})