import { Message } from "@common/openai";
import { insertLorebook } from "@main/openai/prompt/lorebook";
import { insertProfile } from "@main/openai/prompt/profile";
import { firstSystemMessage, secondSystemMessage, thirdSystemMessage } from "@main/openai/prompt/system";

export function buildPrompt(prevMessages: Message[], inputMessage: Message) {
    let firstSystem = firstSystemMessage
    firstSystem = insertProfile(firstSystem)
    firstSystem = insertLorebook(firstSystem,
        [inputMessage, ...prevMessages.slice(-3 * 2).reverse()]
    )

    return firstSystem + '\n\n'
        + secondSystemMessage + '\n\n'
        + thirdSystemMessage + '\n\n'
}