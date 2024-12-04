import { claudeProfile, geminiProfile } from "./profile";

export interface LoreBook {
    activationKeys: string[]; // [] for global
    content: string;
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

export function insertLorebook(prompt: string) {
    return prompt.replace('{{lore-slot}}',
        lorebooks.map(lorebook => lorebook.content).join('\n\n'))
}