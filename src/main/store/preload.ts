import { Setting } from "@common/setting"
import { contextBridge, ipcRenderer } from "electron"
import { mainChannel, rendererChannel } from "./channels"
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
    deleteSession(name: string) {
        ipcRenderer.invoke(mainChannel.DELETE_SESSION, name)
    },

    setCurrentSession(name: string) {
        ipcRenderer.invoke(mainChannel.SET_CURRENT_SESSION, name)
    },
    getCurrentSession(): Promise<string> {
        return ipcRenderer.invoke(mainChannel.GET_CURRENT_SESSION)
    },
    createSession(name: string) {
        ipcRenderer.invoke(mainChannel.CREATE_SESSION, name)
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
    },

    onSessionsChanged(callback: () => void) {
        ipcRenderer.on(rendererChannel.SESSONS_CHANGED, callback)
    },
    removeSessionsChangedListeners() {
        ipcRenderer.removeAllListeners(rendererChannel.SESSONS_CHANGED)
    }
}

contextBridge.exposeInMainWorld('store', preload)