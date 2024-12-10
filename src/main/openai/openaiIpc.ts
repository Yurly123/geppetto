import { ipcMain } from "electron";
import { mainChannel, rendererChannel } from "./channels";
import { CompletionRequest } from "@common/openai";
import { handleCompletion as handleOpenAICompletion } from "./handler";
import { handleCompletion as handleGoogleCompletion } from "@main/google/handler";

export function registerOpenaiIpc() {
    ipcMain.handle(mainChannel.COMPLETION, async ({ sender }, request: CompletionRequest) => {
        if (request.geminiMode)
            handleGoogleCompletion(sender, request)
                .catch(handleError);
        else
            handleOpenAICompletion(sender, request)
                .catch(handleError);

        function handleError(error: any) {
            sender.send(rendererChannel.COMPLETION_ERROR, error.toString());
        }
    });
}