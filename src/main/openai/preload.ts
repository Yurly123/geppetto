import { contextBridge, ipcRenderer } from "electron";
import { mainChannel, rendererChannel } from "./channels";
import { Message } from "@common/types";

declare global {
    interface Window {
        openai: typeof preload
    }
}

const preload = {
    requestCompletion(messages: Message[]) {
        ipcRenderer.invoke(mainChannel.completion, messages)
    },

    onCompletionChunk(callback: (chunk: string) => void) {
        const channel = rendererChannel.completionChunk
        ipcRenderer.removeAllListeners(channel)
        ipcRenderer.on(channel, (_, chunk: string) => {
            callback(chunk)
        });
    },

    onCompletionEnd(callback: (content: string) => void) {
        const channel = rendererChannel.completionEnd
        ipcRenderer.removeAllListeners(channel)
        ipcRenderer.on(channel, (_, content: string) => {
            callback(content)
        });
    },
}

contextBridge.exposeInMainWorld('openai', preload)