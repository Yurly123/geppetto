import { Message } from "@common/openai";
import { firstSystemMessage, secondSystemMessage, thirdSystemMessage } from "./system";

export function buildPrompt(prevMessages: Message[], inputMessage: Message) {
    return [
        firstSystemMessage(),
        ...prevMessages,
        secondSystemMessage(),
        inputMessage,
        thirdSystemMessage(),
    ]
}