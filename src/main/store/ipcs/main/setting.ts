import { initialSetting, Setting, settingSchema, SettingStoreData } from '@common/setting';
import { mainChannel } from '@main/store/channels';
import { safeLoad, safeSave } from '@main/store/safeStore';
import { ipcMain } from 'electron';
import Store from 'electron-store';
import { existsSync } from 'fs';

export function registerSettingStoreIpc() {
    const settingStore = new Store<SettingStoreData>({
        name: 'setting',
        schema: settingSchema,
    })

    ipcMain.handle(mainChannel.SAVE_SETTING, (_, setting: Setting) => {
        Object.entries(setting).forEach(([name, element]) => {
            switch (name) {
                case 'OpenAI API키':
                    safeSave('openai.key', element.value as string)
                    break
                case 'Gemini API키':
                    safeSave('gemini.key', element.value as string)
                    break
                default:
                    settingStore.set(name, element.value)
            }
        })
    })

    ipcMain.handle(mainChannel.LOAD_SETTING, (_) => {
        const setting: Setting = { ...initialSetting }
        Object.entries(setting).forEach(([name, element]) => {
            switch (name) {
                case 'OpenAI API키':
                    element.value = safeLoad('openai.key')
                    break
                case 'Gemini API키':
                    element.value = safeLoad('gemini.key')
                    break
                default:
                    element.value = settingStore.get(name)
            }
            element.value ??= element.default
        })
        return setting
    })

    ipcMain.handle(mainChannel.CHECK_SETTING_FILE, () => {
        return existsSync(settingStore.path)
    })
}
