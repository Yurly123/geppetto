import { Setting } from "@common/setting"
import { contextBridge, ipcRenderer } from "electron"
import { mainChannel } from "./channels"
import { Message } from "@common/openai"

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

    saveMessages(messages: Message[]) {
        ipcRenderer.invoke(mainChannel.SAVE_MESSAGES, messages)
    },
    loadMessages() {
        return new Promise<Message[]>((resolve, reject) => {
            ipcRenderer.invoke(mainChannel.LOAD_MESSAGES)
                .then((messages) => resolve(messages))
                .catch((error) => reject(error))
        })
    },

    openStorageFolder() {
        ipcRenderer.invoke(mainChannel.OPEN_STORAGE_FOLDER)
    },
}

contextBridge.exposeInMainWorld('store', preload)