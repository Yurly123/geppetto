import { Message } from "./types";

export function createMessage(
    role: Message['role'], 
    content: Message['content'],
): Message {
    return { role, content };
}