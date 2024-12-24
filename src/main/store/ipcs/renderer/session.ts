import { Messages } from "@common/openai";
import { mainChannel, rendererChannel } from "@main/store/channels";
import { ipcRenderer } from "electron";

export const sessionPreload = {
    saveSession(name: string, messages: Messages) {
        ipcRenderer.invoke(mainChannel.SAVE_SESSION, name, messages)
    },
    loadSession(name: string): Promise<Messages> {
        return ipcRenderer.invoke(mainChannel.LOAD_SESSION, name)
    },
    deleteSession(name: string) {
        ipcRenderer.invoke(mainChannel.DELETE_SESSION, name)
    },
    createSession(name: string) {
        ipcRenderer.invoke(mainChannel.CREATE_SESSION, name)
    },

    setCurrentSession(name: string) {
        ipcRenderer.invoke(mainChannel.SET_CURRENT_SESSION, name)
    },
    getCurrentSession(): Promise<string> {
        return ipcRenderer.invoke(mainChannel.GET_CURRENT_SESSION)
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
};