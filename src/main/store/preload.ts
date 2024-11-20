import { Setting } from "@common/setting"
import { contextBridge, ipcRenderer } from "electron"
import { mainChannel } from "./channels"

declare global {
    interface Window {
        store: typeof preload
    }
}

const preload = {
    saveSetting(setting: Setting) {
        ipcRenderer.invoke(mainChannel.SAVE_SETTING, setting)
    }
}

contextBridge.exposeInMainWorld('store', preload)