import { ipcMain } from "electron";
import { mainChannel, rendererChannel } from "./channels";
import { CompletionRequest } from "@common/openai";
import { handleCompletion } from "./handler";

export function registerOpenaiIpc() {
    ipcMain.handle(mainChannel.COMPLETION, ({ sender }, request: CompletionRequest) => {
        handleCompletion(sender, request)
            .catch(error =>
                sender.send(rendererChannel.COMPLETION_ERROR, error.message)
            );
    });
}