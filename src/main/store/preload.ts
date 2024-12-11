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
    loadSetting(): Promise<Setting> {
        return ipcRenderer.invoke(mainChannel.LOAD_SETTING)
    },

    saveMessages(messages: Message[]) {
        ipcRenderer.invoke(mainChannel.SAVE_MESSAGES, messages)
    },
    loadMessages(): Promise<Message[]> {
        return ipcRenderer.invoke(mainChannel.LOAD_MESSAGES)
    },

    saveSession(name: string, messages: Message[]) {
        ipcRenderer.invoke(mainChannel.SAVE_SESSION, name, messages)
    },
    loadSession(name: string): Promise<Message[]> {
        return ipcRenderer.invoke(mainChannel.LOAD_SESSION, name)
    },

    openStorageFolder() {
        ipcRenderer.invoke(mainChannel.OPEN_STORAGE_FOLDER)
    },

    checkSettingFile(): Promise<boolean> {
        return ipcRenderer.invoke(mainChannel.CHECK_SETTING_FILE)
    },
    checkMessagesFile(): Promise<boolean> {
        return ipcRenderer.invoke(mainChannel.CHECK_MESSAGES_FILE)
    },
    getAllSessions(): Promise<string[]> {
        return ipcRenderer.invoke(mainChannel.GET_ALL_SESSIONS)
    }
}

contextBridge.exposeInMainWorld('store', preload)