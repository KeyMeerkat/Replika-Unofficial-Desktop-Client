/*
    settings.js - Controls the settings page of the app
*/
const path = require('path')
const Store = require('electron-store');
const Themes = require('../themes')


// MDC Dialogs
var deleteThemeDialog = undefined
if (document.getElementById('settings')) {
    deleteThemeDialog = new mdc.dialog.MDCDialog(document.querySelector('#themeDeleteDialog'));
}

function deleteTheme(name) {
    document.getElementById('delete-theme-dialog-content').innerText = (`Delete the theme "${name}"?`);
    deleteThemeDialog.open();
}

// MDC switches
for (const el of document.querySelectorAll('.mdc-switch')) {
    const switchControl = new mdc.switchControl.MDCSwitch(el);
}

// MDC Tooltips
if (document.querySelector('#tooltip-colour-scheme')) {
    const colourSchemeTooltip = new mdc.tooltip.MDCTooltip(document.querySelector('#tooltip-colour-scheme'));
}




// Colour scheme
const store = new Store();
function updateColourScheme(name) {
    store.set('colourScheme', name);

    // Restart the app to apply the changes
    ipc.send('restart_app');
}

// Check one of the colour scheme boxes depending on what colour scheme is selected
if (document.getElementById('settings')) {
    if (store.get('colourScheme') == 'system') {
        document.getElementById('colour-scheme-radio-system').checked = true;
    }
    if (store.get('colourScheme') == 'light') {
        document.getElementById('colour-scheme-radio-light').checked = true;
    }
    if (store.get('colourScheme') == 'dark') {
        document.getElementById('colour-scheme-radio-dark').checked = true;
    }
}



// Display all installed themes
var themes = new Themes;
var themesListElement = undefined;

// Get installed themes
function displayThemeList() {
    var installedThemes = themes.getInstalledThemes();
    themesListElement = document.getElementById('themes-list');

    var themesPath = path.join(store.get('appDataPath'), 'themes');

    console.log(installedThemes);

    // For each theme create a card listing
    installedThemes.installedThemes.forEach(theme => {
        element = document.createElement('div');
        element.className = 'mdc-card mdc-card--outlined theme-card';
        element.innerHTML = `
            <div class="mdc-card__media mdc-card__media--16-9" style="background:url('${path.join(themesPath, theme.name.toLowerCase(), theme.banner)}');"></div>
            <div class="mdc-card-wrapper__text-section">

                <div class="theme-card__title">${theme.name}</div>
                <div class="theme-card__subhead">${theme.description}</div>

            </div>

            <div class="mdc-card__actions">

                <button class="mdc-button mdc-card__action mdc-card__action--button">
                    <span class="mdc-button__label">Use</span>
                    <div class="mdc-button__ripple"></div>
                </button>
                <button onclick="deleteTheme('${theme.name}')" class="mdc-button mdc-card__action mdc-card__action--button">
                    <span class="mdc-button__label">Delete</span>
                    <div class="mdc-button__ripple"></div>
                </button>

            </div>
        `;

        // Add to theme list
        themesListElement.appendChild(element);
    });
}

// If we are in the settings page, get the installed themes and list them
if (document.getElementById('themes-list')) {
    displayThemeList();
}