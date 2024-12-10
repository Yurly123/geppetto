import { Message } from "@common/openai";

export interface Content {
    role: 'user' | 'model' | 'system';
    parts: [{ text: string }]
}

export function messageToContent(message: Message): Content {
    return {
        role: message.role === 'assistant'? 'model' : message.role,
        parts: [{ text: message.content }]
    }
}

export function contentToMessage(content: Content, token?: number): Message {
    return {
        role: content.role === 'model' ? 'assistant' : content.role,
        content: content.parts[0].text,
        token: token
    }
}

export function createContent(role: Content['role'], text: string): Content {
    return {
        role: role,
        parts: [{ text: text }]
    }
}