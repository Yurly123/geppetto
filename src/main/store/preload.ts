import { contextBridge, ipcRenderer } from "electron"
import { mainChannel } from "./channels"
import { settingPreload } from "./ipcs/renderer"
import { messagesPreload } from "./ipcs/renderer/messages"
import { sessionPreload } from "./ipcs/renderer/session"

declare global {
    interface Window {
        store: typeof preload
    }
}

const preload = {
    ...settingPreload,
    ...messagesPreload,
    ...sessionPreload,

    openStorageFolder() {
        ipcRenderer.invoke(mainChannel.OPEN_STORAGE_FOLDER)
    },
}

contextBridge.exposeInMainWorld('store', preload)