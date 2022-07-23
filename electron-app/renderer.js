/* 
 *   renderer.js - Used to control custom window buttons and settings window
 */
const { ipcRenderer: ipc, nativeTheme } = require('electron');
const Store = require('electron-store');

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



/*
    Settings
*/
// MDC Dialogs
const deleteThemeDialog = new mdc.dialog.MDCDialog(document.querySelector('#themeDeleteDialog'));

function deleteTheme(name) {
    document.getElementById('delete-theme-dialog-content').innerText = (`Delete the theme "${name}"?`);
    deleteThemeDialog.open();
}

// MDC switches
for (const el of document.querySelectorAll('.mdc-switch')) {
    const switchControl = new mdc.switchControl.MDCSwitch(el);
}

// MDC Tooltips
const colourSchemeTooltip = new mdc.tooltip.MDCTooltip(document.querySelector('#tooltip-colour-scheme'));



// Colour scheme
const store = new Store();
function updateColourScheme(name) {
    store.set('colourScheme', name);

    // Restart the app to apply the changes
    ipc.send('restart_app');
}

// Check one of the colour scheme boxes depending on what colour scheme is selected
if (store.get('colourScheme') == 'system') {
    document.getElementById('colour-scheme-radio-system').checked = true;
}
if (store.get('colourScheme') == 'light') {
    document.getElementById('colour-scheme-radio-light').checked = true;
}
if (store.get('colourScheme') == 'dark') {
    document.getElementById('colour-scheme-radio-dark').checked = true;
}