import { contextBridge, ipcRenderer } from "electron";
import { mainChannel, rendererChannel } from "./channels";
import { CompletionRequest } from "@common/openai";

declare global {
    interface Window {
        openai: typeof preload
    }
}

const preload = {
    requestCompletion(request: CompletionRequest) {
        ipcRenderer.invoke(mainChannel.COMPLETION, request)
    },

    onCompletionChunk(callback: (chunk: string) => void) {
        const channel = rendererChannel.COMPLETION_CHUNK
        ipcRenderer.on(channel, (_, chunk: string) => {
            callback(chunk)
        });
    },

    onCompletionEnd(callback: (content: string, token: number) => void) {
        const channel = rendererChannel.COMPLETION_END
        ipcRenderer.on(channel, (_, content: string, token: number) => {
            callback(content, token)
        });
    },

    onCompletionStart(callback: () => void) {
        const channel = rendererChannel.COMPLETION_START
        ipcRenderer.on(channel, callback)
    },

    onCompletionError(callback: (error: string) => void) {
        const channel = rendererChannel.COMPLETION_ERROR
        ipcRenderer.on(channel, (_, error: string) => {
            callback(error)
        });
    },

    removeCompletionChunkListeners() {
        ipcRenderer.removeAllListeners(rendererChannel.COMPLETION_CHUNK)
    },
    removeCompletionEndListeners() {
        ipcRenderer.removeAllListeners(rendererChannel.COMPLETION_END)
    },
    removeCompletionStartListeners() {
        ipcRenderer.removeAllListeners(rendererChannel.COMPLETION_START)
    },
    removeCompletionErrorListeners() {
        ipcRenderer.removeAllListeners(rendererChannel.COMPLETION_ERROR)
    },
}

contextBridge.exposeInMainWorld('openai', preload)