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
    },

    loadSetting() {
        return new Promise<Setting>((resolve, reject) => {
            ipcRenderer.invoke(mainChannel.LOAD_SETTING)
                .then((setting) => resolve(setting))
                .catch((error) => reject(error))
        })
    },
}

contextBridge.exposeInMainWorld('store', preload)