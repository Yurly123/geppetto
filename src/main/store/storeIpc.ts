import { app, ipcMain, shell } from "electron"
import { mainChannel } from "./channels"
import { initialSetting, Setting, settingSchema, SettingStoreData } from "@common/setting"
import { messageSchema } from './schema';
import Store from 'electron-store';
import { Message, Messages } from "@common/openai";
import { existsSync, mkdirSync, readdirSync } from 'fs';
import { safeLoad, safeSave } from "./safeStore";
import { join } from "path";

export function registerStoreIpc() {
    const settingStore = new Store<SettingStoreData>({
        name: 'setting',
        schema: settingSchema,
    })
    const messageStore = new Store<Messages>({
        name: 'messages',
        schema: messageSchema,
    })
    const sessionStore = (name: string) => {
        const sessionPath = join(app.getPath('userData'), 'sessions')
        if (!existsSync(sessionPath)) 
            mkdirSync(sessionPath)
        return new Store({
            name: join('sessions', name),
            schema: messageSchema,
        })
    }

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

    ipcMain.handle(mainChannel.SAVE_MESSAGES, (_, messages: Message[]) => {
        messageStore.set({ messages })
    })
    ipcMain.handle(mainChannel.LOAD_MESSAGES, (_) => {
        return messageStore.store.messages
    })

    ipcMain.handle(mainChannel.SAVE_SESSION, (_, name: string, messages: Message[]) => {
        sessionStore(name).set({ messages })
    })
    ipcMain.handle(mainChannel.LOAD_SESSION, (_, name: string) => {
        return sessionStore(name).store.messages
    })

    ipcMain.handle(mainChannel.OPEN_STORAGE_FOLDER, () => {
        shell.openPath(app.getPath('userData'))
    })

    ipcMain.handle(mainChannel.CHECK_SETTING_FILE, () => {
        return existsSync(settingStore.path)
    })
    ipcMain.handle(mainChannel.CHECK_MESSAGES_FILE, () => {
        return existsSync(messageStore.path)
    })
    ipcMain.handle(mainChannel.GET_ALL_SESSIONS, () => {
        const sessionPath = join(app.getPath('userData'), 'sessions')
        if (!existsSync(sessionPath)) 
            mkdirSync(sessionPath)
        return readdirSync(sessionPath)
    })
}