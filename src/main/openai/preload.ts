import { contextBridge, ipcRenderer } from "electron";
import { mainChannel, rendererChannel } from "./channels";
import { Message } from "@common/openai";
import { ChatModel } from "openai/resources";

declare global {
    interface Window {
        openai: typeof preload
    }
}

const preload = {
    requestCompletion(messages: Message[], model: ChatModel) {
        ipcRenderer.invoke(mainChannel.COMPLETION, messages, model)
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

    removeCompletionChunkListeners() {
        ipcRenderer.removeAllListeners(rendererChannel.COMPLETION_CHUNK)
    },
    removeCompletionEndListeners() {
        ipcRenderer.removeAllListeners(rendererChannel.COMPLETION_END)
    },
    removeCompletionStartListeners() {
        ipcRenderer.removeAllListeners(rendererChannel.COMPLETION_START)
    },
}

contextBridge.exposeInMainWorld('openai', preload)