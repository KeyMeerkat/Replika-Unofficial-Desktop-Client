/* 
 *   renderer.js - Used to control custom window buttons and settings window
 */
const { ipcRenderer: ipc, nativeTheme } = require('electron');

// Close
if (document.getElementById('button_window_close')) {
    const closeApp = document.getElementById('button_window_close');
    closeApp.addEventListener('click', () => {
        ipc.send('close');
    });
}

// Minimize
if (document.getElementById('button_window_min')) {
    const minApp = document.getElementById('button_window_min');
    minApp.addEventListener('click', () => {
        ipc.send('minimize');
    });
}



// Open settings
if (document.getElementById('button_window_settings')) {
    const openAppSettings = document.getElementById('button_window_settings');
    openAppSettings.addEventListener('click', () => {
        ipc.send('openAppSettings');
    });
}

// Close settings
if (document.getElementById('button_settings_window_close')) {
    const closeSettings = document.getElementById('button_settings_window_close');
    closeSettings.addEventListener('click', () => {
        ipc.send('settings_close');
    });
}