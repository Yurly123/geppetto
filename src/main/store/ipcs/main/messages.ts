import { Messages } from "@common/openai";
import { mainChannel } from "@main/store/channels";
import { messageSchema } from "@main/store/schema"
import { ipcMain } from "electron"
import Store from 'electron-store';
import { existsSync } from "fs";

export function registerMessagesStoreIpc() {
    const messageStore = new Store<Messages>({
        name: 'messages',
        schema: messageSchema,
    })

    ipcMain.handle(mainChannel.SAVE_MESSAGES, (_, messages: Messages) => {
        messageStore.set(messages)
    })

    ipcMain.handle(mainChannel.LOAD_MESSAGES, (_) => {
        return messageStore.store
    })

    ipcMain.handle(mainChannel.CHECK_MESSAGES_FILE, () => {
        return existsSync(messageStore.path)
    })
}