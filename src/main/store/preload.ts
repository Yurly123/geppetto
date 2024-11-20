import { contextBridge, ipcRenderer } from "electron"

declare global {
    interface Window {
        store: typeof preload
    }
}

const preload = {
}

contextBridge.exposeInMainWorld('store', preload)