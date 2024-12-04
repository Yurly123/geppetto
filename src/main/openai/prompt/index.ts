import { createMessage, Message } from "@common/openai";
import { firstSystemMessage, secondSystemMessage, thirdSystemMessage } from "./system";
import { insertProfile } from "./profile";
import { insertLorebook } from "./lorebook";

export function buildPrompt(prevMessages: Message[], inputMessage: Message) {
    let firstSystem = firstSystemMessage
    firstSystem = insertProfile(firstSystem)
    firstSystem = insertLorebook(firstSystem)
    return [
        createMessage('system', firstSystem),
        ...prevMessages,
        createMessage('system', secondSystemMessage),
        inputMessage,
        createMessage('system', thirdSystemMessage)
    ]
}