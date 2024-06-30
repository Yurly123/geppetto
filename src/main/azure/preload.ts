import { Viseme } from "@common/types";
import { contextBridge, ipcRenderer } from "electron";
import { mainChannel, rendererChannel } from "./channels";

declare global {
    interface Window {
        azure: typeof preload
    }
}

const preload = {
    requestSynthesis(content: string) {
        ipcRenderer.invoke(mainChannel.SYNTHESIS, content)
    },

    onSynthesisViseme(callback: (viseme: Viseme) => void) {
        ipcRenderer.invoke(mainChannel.SYNTHESIS_VISEME)
        const channel = rendererChannel.SYNTHESIS_VISEME
        ipcRenderer.removeAllListeners(channel)
        ipcRenderer.on(channel, (_, viseme: Viseme) => {
            callback(viseme)
        })
    },

    onSynthesisEnd(callback: (audio: ArrayBuffer) => void) {
        ipcRenderer.invoke(mainChannel.SYNTHESIS_END)
        const channel = rendererChannel.SYNTHESIS_END
        ipcRenderer.removeAllListeners(channel)
        ipcRenderer.on(channel, (_, audio: ArrayBuffer) => {
            callback(audio)
        })
    },
}

contextBridge.exposeInMainWorld('azure', preload)