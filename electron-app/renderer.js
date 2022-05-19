/* 
 *   renderer.js - Used to control custom window buttons
 */
const { ipcRenderer: ipc } = require('electron');

// Close
const closeApp = document.getElementById('button_window_close');
closeApp.addEventListener('click', () => {
    ipc.send('close')
});

// Minimize
const minApp = document.getElementById('button_window_min');
minApp.addEventListener('click', () => {
    ipc.send('minimize')
});