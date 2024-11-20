import { ipcMain } from "electron"
import { mainChannel } from "./channels"
import { Setting } from "@common/setting"
import Store from 'electron-store';

export function registerStoreIpc() {
    const settingStore = new Store<Setting>()

    ipcMain.handle(mainChannel.SAVE_SETTING, (_, setting: Setting) => {

    })
}