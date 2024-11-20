import { app, BrowserWindow, Menu, MenuItem } from 'electron';
import path from 'path';
import OpenAI from 'openai';
import { registerTitlebarIpc } from '@main/window/titlebarIpc';
import { registerOpenaiIpc } from './openai/openaiIpc';
import { SpeechConfig, SpeechSynthesizer } from 'microsoft-cognitiveservices-speech-sdk';
import { registerAzureIpc } from './azure/azureIpc';
import { registerStoreIpc } from './store/storeIpc';

// Electron Forge automatically creates these entry points
declare const APP_WINDOW_WEBPACK_ENTRY: string;
declare const APP_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

let appWindow: BrowserWindow;

const openai = new OpenAI()
const speechConfig = SpeechConfig.fromSubscription(
  process.env.AZURE_SUBSCRIPTION_KEY,
  process.env.AZURE_SERVICE_REGION
)
speechConfig.speechSynthesisLanguage = 'ko-KR'
speechConfig.speechSynthesisVoiceName = 'ko-KR-SoonBokNeural'
const synthesizer = new SpeechSynthesizer(speechConfig)

/**
 * Create Application Window
 * @returns {BrowserWindow} Application Window Instance
 */
export function createAppWindow(): BrowserWindow {
  // Create new window instance
  appWindow = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#202020',
    show: false,
    autoHideMenuBar: true,
    frame: false,
    titleBarStyle: 'hidden',
    icon: path.resolve('assets/icons/appIcon.ico'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      nodeIntegrationInWorker: false,
      nodeIntegrationInSubFrames: false,
      preload: APP_WINDOW_PRELOAD_WEBPACK_ENTRY,
      sandbox: false,
    },
  });

  // Load the index.html of the app window.
  appWindow.loadURL(APP_WINDOW_WEBPACK_ENTRY);

  // Show window when its ready to
  appWindow.on('ready-to-show', () => appWindow.show());

  // Register Inter Process Communication for main process
  registerMainIPC();

  // Close all windows when main window is closed
  appWindow.on('close', () => {
    appWindow = null;
    app.quit();
  });

  registerShortcuts()

  return appWindow;
}

/**
 * Register Inter Process Communication
 */
function registerMainIPC() {
  /**
   * Here you can assign IPC related codes for the application window
   * to Communicate asynchronously from the main process to renderer processes.
   */
  registerTitlebarIpc(appWindow);
  registerOpenaiIpc(openai);
  registerAzureIpc(synthesizer);
  registerStoreIpc();
}

function registerShortcuts() {
  const menu = Menu.getApplicationMenu()
  const register = (accel: string, isIn: Boolean) =>
    menu.append(new MenuItem({
      accelerator: accel,
      click: isIn ? zoomIn : zoomOut
    }))
  register('CmdOrCtrl+Plus', true)
  register('CmdOrCtrl+-', false)
  register('CmdOrCtrl+=', true)
  register('CmdOrCtrl+_', false)
  register('CmdOrCtrl+numadd', true)
  register('CmdOrCtrl+numsub', false)
  Menu.setApplicationMenu(menu)

  function zoomIn() {
    appWindow.webContents.zoomLevel += 0.5
  }
  function zoomOut() {
    appWindow.webContents.zoomLevel -= 0.5
  }
}