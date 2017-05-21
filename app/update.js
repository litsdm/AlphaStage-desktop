// @flow
import { BrowserWindow, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';

export default class AutoUpdater {
  mainWindow: BrowserWindow;

  static checkForUpdates() {
    autoUpdater.checkForUpdates();
  }

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
    autoUpdater.autoDownload = false;
  }

  setListeners() {
    // Auto updater only works for production
    autoUpdater.on('update-available', () => {
      this.mainWindow.webContents.send('update-available');
    });

    autoUpdater.on('update-downloaded', () => {
      this.mainWindow.webContents.send('update-downloaded');
    });

    ipcMain.on('download-update', () => {
      autoUpdater.downloadUpdate();
    });

    ipcMain.on('quit-and-install', () => {
      autoUpdater.quitAndInstall();
    });
  }
}
