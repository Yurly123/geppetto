import { Message } from "@common/openai";
import { claudeProfile, geminiProfile } from "./profile";

export interface LoreBook {
    activationKeys: string[]; // [] for global
    content: string;
}

function isKeyIncluded(lorebook: LoreBook, messages: Message[]) {
    for (const key of lorebook.activationKeys) {
        for (const message of messages) {
            const messageFormatted = message.content.toLowerCase()
            const keyFormatted = key.toLowerCase()
            if (messageFormatted.includes(keyFormatted)) {
                return true
            }
        }
    }
    return false
}

export const lorebooks: LoreBook[] = [
    {
        activationKeys: ['gemini', '제미니'],
        content: '### Gemini Profile\n' + geminiProfile,
    },
    {
        activationKeys: ['claude', '클로드'],
        content: '### Claude Profile\n' + claudeProfile,
    }
]

export function insertLorebook(prompt: string, searchingMessages: Message[]) {
    let activatedLorebooks: LoreBook[] = []
    for (const lorebook of lorebooks) {
        if (lorebook.activationKeys.length === 0) {
            activatedLorebooks.push(lorebook)
            continue
        } 
        if (isKeyIncluded(lorebook, searchingMessages)) {
            activatedLorebooks.push(lorebook)
        }
    }

    const fullLore = activatedLorebooks.map(lorebook => lorebook.content).join('\n\n')
    prompt = prompt.replace('{{lore-slot}}', fullLore)
    return prompt
}