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
        return ipcRenderer.invoke(mainChannel.LOAD_SETTING)
    },

    saveMessages(messages: Message[]) {
        ipcRenderer.invoke(mainChannel.SAVE_MESSAGES, messages)
    },
    loadMessages() {
        return ipcRenderer.invoke(mainChannel.LOAD_MESSAGES)
    },

    openStorageFolder() {
        ipcRenderer.invoke(mainChannel.OPEN_STORAGE_FOLDER)
    },

    checkSettingFile() {
        return ipcRenderer.invoke(mainChannel.CHECK_SETTING_FILE)
    },
    checkMessagesFile() {
        return ipcRenderer.invoke(mainChannel.CHECK_MESSAGES_FILE)
    }
}

contextBridge.exposeInMainWorld('store', preload)