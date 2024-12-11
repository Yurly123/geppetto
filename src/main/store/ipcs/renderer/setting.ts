import { Setting } from "@common/setting"
import { mainChannel } from "@main/store/channels"
import { ipcRenderer } from "electron"

export const settingPreload = {
    saveSetting(setting: Setting) {
        ipcRenderer.invoke(mainChannel.SAVE_SETTING, setting)
    },

    loadSetting(): Promise<Setting> {
        return ipcRenderer.invoke(mainChannel.LOAD_SETTING)
    },

    checkSettingFile(): Promise<boolean> {
        return ipcRenderer.invoke(mainChannel.CHECK_SETTING_FILE)
    },
}