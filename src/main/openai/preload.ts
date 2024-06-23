import { contextBridge, ipcRenderer } from "electron";
import { mainChannel, rendererChannel } from "./channels";

declare global {
    interface Window {
        openai: typeof preload
    }
}

const preload = {
    requestCompletion(message: string) {
        ipcRenderer.invoke(mainChannel.completion, message)
    },

    onCompletionChunk(callback: (chunk: string) => void) {
        const channel = rendererChannel.completionChunk
        ipcRenderer.removeAllListeners(channel)
        ipcRenderer.on(channel, (_, chunk: string) => {
            callback(chunk)
        });
    }

}

contextBridge.exposeInMainWorld('openai', preload)