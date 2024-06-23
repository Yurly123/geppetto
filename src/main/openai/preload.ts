import { contextBridge, ipcRenderer } from "electron";

declare global {
    interface Window {
        openai: typeof openai;
    }
}

const openai = {
    completion: (message: string) => ipcRenderer.invoke('completion', message)
}

contextBridge.exposeInMainWorld('openai', openai)