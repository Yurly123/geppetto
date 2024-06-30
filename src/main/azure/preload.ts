import { SSMLOption, Viseme } from "@common/types";
import { contextBridge, ipcRenderer } from "electron";
import { mainChannel, rendererChannel } from "./channels";

declare global {
    interface Window {
        azure: typeof preload
    }
}

const preload = {
    requestSynthesis(content: string, option?: SSMLOption) {
        ipcRenderer.invoke(mainChannel.SYNTHESIS, content, option)
    },

    onSynthesisViseme(callback: (viseme: Viseme) => void) {
        ipcRenderer.invoke(mainChannel.SYNTHESIS_VISEME)
        const channel = rendererChannel.SYNTHESIS_VISEME
        ipcRenderer.on(channel, (_, viseme: Viseme) => {
            callback(viseme)
        })
    },

    onSynthesisEnd(callback: (audio: ArrayBuffer) => void) {
        ipcRenderer.invoke(mainChannel.SYNTHESIS_END)
        const channel = rendererChannel.SYNTHESIS_END
        ipcRenderer.on(channel, (_, audio: ArrayBuffer) => {
            callback(audio)
        })
    },

    removeSynthesisVisemeListeners() {
        ipcRenderer.removeAllListeners(rendererChannel.SYNTHESIS_VISEME)
    },
    removeSynthesisEndListeners() {
        ipcRenderer.removeAllListeners(rendererChannel.SYNTHESIS_END)
    }
}

contextBridge.exposeInMainWorld('azure', preload)