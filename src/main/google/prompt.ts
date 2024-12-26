import { createContent, messageToContent } from "@common/google/content";
import { CompletionRequest } from "@common/openai";
import { replaceWithUserName } from "@common/openai/userName";
import { firstSystemMessage, insertLorebook, insertProfile, secondSystemMessage, thirdSystemMessage } from "@main/openai/prompt";

export function buildPrompt(request: CompletionRequest) {
    let firstSystem = firstSystemMessage
    firstSystem = insertProfile(firstSystem)
    firstSystem = insertLorebook(firstSystem, request)

    const contents = [
        createContent('user', firstSystem),
        createContent('user', secondSystemMessage),
        createContent('user', thirdSystemMessage),
        ...request.messages.slice(0, -1).map(messageToContent),
        messageToContent(request.messages.at(-1)),
    ]
    return replaceWithUserName(contents, request.userName)
}