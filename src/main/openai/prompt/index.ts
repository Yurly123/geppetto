import { CompletionRequest, createMessage, Message } from "@common/openai";
import { firstSystemMessage, secondSystemMessage, thirdSystemMessage } from "./system";
import { insertProfile } from "./profile";
import { insertLorebook } from "./lorebook";
import { replaceWithUserName } from "@common/openai/userName";

export function buildPrompt(request: CompletionRequest): Message[] {
    let firstSystem = firstSystemMessage
    firstSystem = insertProfile(firstSystem)
    firstSystem = insertLorebook(firstSystem, request)
    
    const messages = [
        createMessage('system', firstSystem),
        ...request.messages.slice(0, -1),
        createMessage('system', secondSystemMessage),
        request.messages.at(-1),
        createMessage('system', thirdSystemMessage)
    ]
    return replaceWithUserName(messages, request.userName)
}

export * from './lorebook'
export * from './profile'
export * from './system'