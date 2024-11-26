export interface Message {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

// This interface is for storing messages
// In other cases, just use Message[]
export interface Messages {
    messages: Message[];
}

export function createMessage(
    role: Message['role'], 
    content: Message['content'],
): Message {
    return { role, content };
}

export const RESPONSE_START = '### Response';

export function extractResponse(content: string) {
    return content.split(RESPONSE_START).at(-1)?.trim();
}