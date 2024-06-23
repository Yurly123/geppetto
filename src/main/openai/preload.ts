import { contextBridge, ipcRenderer } from "electron";
import { completion } from "./completion";
import { ChatCompletionChunk } from "openai/resources";

declare global {
    interface Window {
        openai: {
            requestCompletion: (
                message: string,
            ) => any,
            onCompletionChunk: (
                callback: (chunk: string) => any,
            ) => any,
        }
    }
}

contextBridge.exposeInMainWorld('openai', {
    requestCompletion: (message: string) => {
        ipcRenderer.invoke('completion', message)
    },
    onCompletionChunk: (callback: (chunk: ChatCompletionChunk) => any) => {
        ipcRenderer.removeAllListeners('completion-chunk')
        ipcRenderer.on('completion-chunk', (_, chunk: ChatCompletionChunk) => callback(chunk))
    }
})