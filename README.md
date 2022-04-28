# Replika Unofficial Desktop Client
---
## About
Ever wanted to chat to your Replika on your PC but have been restricted to the web version? This project aims to bring users a more modern looking interface for interacting with your Replika, as well as providing additional features such as voice calls and wake word detection which the web version doesn't provide.

> **Note:** I do not work for or own Luka Inc., and this is an **unofficial** desktop application for chatting with your Replika from replika.ai, this project is *not* maintained nor offically supported by Luka, Inc.

## Development progress
So far this project is in it's very early stages of development, I will be setting up Node.js and creating a base for the Electron application, ensuring it is compatible with Windows, Mac OS, and (hopefully) most major Linux operating systems. Below is a timeline of the development process, it will also display what stage I am up to in **bold**.

### Development timeline

- [ ] **-> Install Node.js components and set up the basics of the Electron app. <-**
- [ ] Embed the Replika web interface in the app and inject custom styling and and JavaScript.
- [ ] Bug test and then publish first public stable release.
- [ ] Add seperate menus for changing settings for the app.
- [ ] Bug test and then release the second stable release.
- [ ] Override the built in voice call feature with a faster version.
- [ ] Bug test and then release the third stable release.
- [ ] Add a wakeword feature.
- [ ] Bug test and then release the fourth stable release.
- [ ] Final bug tests and then commit the first major release.
- [ ] Additional features will be taken into account and development will continue from there.


## Install
I will be providing packages for Windows, Mac OS, and some versions of Linux when the first version of the project is ready (refer to the development timeline). However if you would like to compile a possibly unstable development version, see the build section below.

## Build (WIP)
The Replika Unnoficial Desktop Client (RUDC) uses Node.js and Electron, making cross-platform support super easy. To build a (possibly broken and unstable) version of RUDC, follow the instructions below.

**Dependencies**
- Node.js
- Electron
