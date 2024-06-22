import { contextBridge } from 'electron';
import titlebarContext from './titlebarContext';

declare global {
  interface Window {
    electron_window: {
      titlebar: typeof titlebarContext;
    };
  }
}

contextBridge.exposeInMainWorld('electron_window', {
  titlebar: titlebarContext,
});
