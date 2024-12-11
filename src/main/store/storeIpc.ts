import { app, ipcMain, shell } from "electron"
import { mainChannel } from "./channels"
import { registerMessagesStoreIpc, registerSessionStoreIpc, registerSettingStoreIpc } from "./ipcs/main";

export function registerStoreIpc() {
    registerSettingStoreIpc()
    registerMessagesStoreIpc()
    registerSessionStoreIpc()

    ipcMain.handle(mainChannel.OPEN_STORAGE_FOLDER, () => {
        shell.openPath(app.getPath('userData'))
    })
}