import { Message } from "@common/openai"
import { mainChannel } from "@main/store/channels"
import { ipcRenderer } from "electron"

export const messagesPreload = {
    saveMessages(messages: Message[]) {
        ipcRenderer.invoke(mainChannel.SAVE_MESSAGES, messages)
    },

    loadMessages(): Promise<Message[]> {
        return ipcRenderer.invoke(mainChannel.LOAD_MESSAGES)
    },

    checkMessagesFile(): Promise<boolean> {
        return ipcRenderer.invoke(mainChannel.CHECK_MESSAGES_FILE)
    },
}