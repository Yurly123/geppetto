export interface Message {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

export function createMessage(
    role: Message['role'], 
    content: Message['content'],
): Message {
    return { role, content };
}

export function systemMessage() {
    return createMessage('system', 'You are a helpful assistant.');
}