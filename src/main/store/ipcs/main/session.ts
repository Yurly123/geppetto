import { Message, Messages } from "@common/openai";
import { mainChannel, rendererChannel } from "@main/store/channels";
import { messageSchema } from "@main/store/schema";
import { app, ipcMain } from "electron"
import Store from 'electron-store';
import { existsSync, mkdirSync, readdirSync, rmSync } from "fs";
import { join } from "path";

export function registerSessionStoreIpc() {
    const sessionStore = (name: string) => {
        const sessionPath = join(app.getPath('userData'), 'sessions')
        if (!existsSync(sessionPath)) 
            mkdirSync(sessionPath)

        return new Store<Messages>({
            name: join('sessions', name),
            schema: messageSchema,
        })
    }

    const currentSessionStore = new Store<{ name: string }>({
        name: 'current-session',
    })

    ipcMain.handle(mainChannel.SAVE_SESSION, ({ sender }, name: string, messages: Message[]) => {
        sessionStore(name).set({ messages })
        sender.send(rendererChannel.SESSONS_CHANGED)
    })
    ipcMain.handle(mainChannel.LOAD_SESSION, (_, name: string) => {
        return sessionStore(name).store.messages
    })
    ipcMain.handle(mainChannel.DELETE_SESSION, ({ sender }, name: string) => {
        sessionStore(name).clear()
        rmSync(join(app.getPath('userData'), 'sessions', `${name}.json`))
        sender.send(rendererChannel.SESSONS_CHANGED)
    })
    ipcMain.handle(mainChannel.CREATE_SESSION, ({ sender }, name: string) => {
        sessionStore(name).set({ messages: [] })
        sender.send(rendererChannel.SESSONS_CHANGED)
    })

    ipcMain.handle(mainChannel.SET_CURRENT_SESSION, ({ sender }, name: string) => {
        currentSessionStore.set({ name })
        sender.send(rendererChannel.SESSONS_CHANGED)
    })
    ipcMain.handle(mainChannel.GET_CURRENT_SESSION, () => {
        return currentSessionStore.store.name
    })

    ipcMain.handle(mainChannel.GET_ALL_SESSIONS, () => {
        const sessionPath = join(app.getPath('userData'), 'sessions')
        if (!existsSync(sessionPath)) 
            mkdirSync(sessionPath)
        return readdirSync(sessionPath)
    })
}