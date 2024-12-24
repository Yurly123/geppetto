export interface SystemMessage {
    role: 'system';
    content: string;
}
export interface UserMessage {
    role: 'user';
    content: string;
}
export interface AssistantMessage {
    role: 'assistant';
    content: string;
    token: number;
}

export type Message = SystemMessage | UserMessage | AssistantMessage;

// This interface is for storing messages
// In other cases, just use Message[]
export interface Messages {
    messages: Message[];
    userName?: string;
}

export function createMessage(role: 'system', content: string): SystemMessage;
export function createMessage(role: 'user', content: string): UserMessage;
export function createMessage(role: 'assistant', content: string, token: number): AssistantMessage;
export function createMessage(
    role: 'system' | 'user' | 'assistant',
    content: string,
    token?: number
): Message {
    const message = { role, content, token };
    assertAssistantHasToken(message);
    return message
}

export function assertAssistantHasToken(message: Message): asserts message is AssistantMessage {
    if (message.role === 'assistant' && message.token === undefined)
        throw new Error('Assistant message must have a token');
}