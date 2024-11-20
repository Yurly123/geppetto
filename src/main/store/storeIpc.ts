import { ipcMain } from "electron"
import { mainChannel } from "./channels"
import { Setting } from "@common/setting"
import { settingSchema } from './schema';
import Store from 'electron-store';

export function registerStoreIpc() {
    const settingStore = new Store<Setting>({
        name: 'setting',
        schema: settingSchema
    })

    ipcMain.handle(mainChannel.SAVE_SETTING, (_, setting: Setting) => {
        console.log(setting)
    })
}