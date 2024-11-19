import { contextBridge, ipcRenderer } from "electron";
import { mainChannel, rendererChannel } from "./channels";
import { Message } from "@common/openai";

declare global {
    interface Window {
        openai: typeof preload
    }
}

const preload = {
    requestCompletion(messages: Message[]) {
        ipcRenderer.invoke(mainChannel.COMPLETION, messages)
    },

    onCompletionChunk(callback: (chunk: string) => void) {
        const channel = rendererChannel.COMPLETION_CHUNK
        ipcRenderer.on(channel, (_, chunk: string) => {
            callback(chunk)
        });
    },

    onCompletionEnd(callback: (content: string) => void) {
        const channel = rendererChannel.COMPLETION_END
        ipcRenderer.on(channel, (_, content: string) => {
            callback(content)
        });
    },

    removeCompletionChunkListeners() {
        ipcRenderer.removeAllListeners(rendererChannel.COMPLETION_CHUNK)
    },
    removeCompletionEndListeners() {
        ipcRenderer.removeAllListeners(rendererChannel.COMPLETION_END)
    },
}

contextBridge.exposeInMainWorld('openai', preload)