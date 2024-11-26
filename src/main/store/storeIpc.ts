import { app, ipcMain, shell } from "electron"
import { mainChannel } from "./channels"
import { Setting } from "@common/setting"
import { messageSchema, settingSchema } from './schema';
import Store from 'electron-store';
import { Message, Messages } from "@common/openai";
import { existsSync } from 'fs';

export function registerStoreIpc() {
    const settingStore = new Store<Setting>({
        name: 'setting',
        schema: settingSchema,
    })
    const messageStore = new Store<Messages>({
        name: 'messages',
        schema: messageSchema,
    })

    ipcMain.handle(mainChannel.SAVE_SETTING, (_, setting: Setting) => {
        settingStore.set(setting)
    })
    ipcMain.handle(mainChannel.LOAD_SETTING, (_) => {
        return settingStore.store
    })

    ipcMain.handle(mainChannel.SAVE_MESSAGES, (_, messages: Message[]) => {
        messageStore.set({ messages })
    })
    ipcMain.handle(mainChannel.LOAD_MESSAGES, (_) => {
        return messageStore.store.messages 
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
}