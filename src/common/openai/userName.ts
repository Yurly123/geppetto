import { Message } from "./message";
import { Response } from "./response";

export function replaceWithUserName(message: Message, userName: string): Message;
export function replaceWithUserName(messages: Message[], userName: string): Message[];
export function replaceWithUserName(response: Response, userName: string): Response;

export function replaceWithUserName(
    input: Message | Message[] | Response,
    userName: string,
) {
    if (Array.isArray(input))
        return replaceWithUserNameMessages(input, userName)
    else if ('role' in input)
        return replaceWithUserNameMessage(input, userName)
    else
        return replaceWithUserNameResponse(input, userName)
}

function replaceWithUserNameMessage(message: Message, userName: string): Message {
    return {
        ...message,
        content: message.content.replace(/{{user}}/g, userName)
    }
}
function replaceWithUserNameMessages(messages: Message[], userName: string): Message[] {
    return messages.map(message => replaceWithUserNameMessage(message, userName))
}
function replaceWithUserNameResponse(response: Response, userName: string): Response {
    return {
        ...response,
        paragraphs: response.paragraphs.map(paragraph => ({
            ...paragraph,
            dialogue: {
                ...paragraph.dialogue,
                content: paragraph.dialogue.content.replace(/{{user}}/g, userName)
            },
            narrative: paragraph.narrative.replace(/{{user}}/g, userName)
        })),
        location: response.location.replace(/{{user}}/g, userName),
        time: response.time.replace(/{{user}}/g, userName),
    }
}

export function replaceWithUserPlaceholder(message: Message, userName: string): Message;
export function replaceWithUserPlaceholder(messages: Message[], userName: string): Message[];
export function replaceWithUserPlaceholder(response: Response, userName: string): Response;

export function replaceWithUserPlaceholder(
    input: Message | Message[] | Response,
    userName: string,
) {
    if (Array.isArray(input))
        return replaceWithUserPlaceholderMessages(input, userName)
    else if ('role' in input)
        return replaceWithUserPlaceholderMessage(input, userName)
    else
        return replaceWithUserPlaceholderResponse(input, userName)
}

function replaceWithUserPlaceholderMessage(message: Message, userName: string): Message {
    const regex = new RegExp(userName, 'g')
    return {
        ...message,
        content: message.content.replace(regex, '{{user}}')
    }
}
function replaceWithUserPlaceholderMessages(messages: Message[], userName: string): Message[] {
    return messages.map(message => replaceWithUserPlaceholderMessage(message, userName))
}
function replaceWithUserPlaceholderResponse(response: Response, userName: string): Response {
    const regex = new RegExp(userName, 'g')
    return {
        ...response,
        paragraphs: response.paragraphs.map(paragraph => ({
            ...paragraph,
            dialogue: {
                ...paragraph.dialogue,
                content: paragraph.dialogue.content.replace(regex, '{{user}}')
            },
            narrative: paragraph.narrative.replace(regex, '{{user}}')
        })),
        location: response.location.replace(regex, '{{user}}'),
        time: response.time.replace(regex, '{{user}}'),
    }
}