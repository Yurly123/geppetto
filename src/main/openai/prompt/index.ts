import { createMessage, Message } from "@common/openai";
import { firstSystemMessage, secondSystemMessage, thirdSystemMessage } from "./system";
import { insertProfile } from "./profile";

export function buildPrompt(prevMessages: Message[], inputMessage: Message) {
    return [
        createMessage('system', insertProfile(firstSystemMessage)),
        ...prevMessages,
        createMessage('system', secondSystemMessage),
        inputMessage,
        createMessage('system', thirdSystemMessage)
    ]
}