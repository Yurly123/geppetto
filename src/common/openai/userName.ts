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
    message.content = message.content
        .replace(/{{user}}/g, userName)
    return message
}
function replaceWithUserNameMessages(messages: Message[], userName: string): Message[] {
    return messages.map(message => {
        message.content = message.content
            .replace(/{{user}}/g, userName)
        return message
    })
}
function replaceWithUserNameResponse(response: Response, userName: string): Response {
    response.paragraphs.forEach(paragraph => {
        const regex = /{{user}}/g
        paragraph.dialogue.content = paragraph.dialogue.content
            .replace(regex, userName)
        paragraph.narrative = paragraph.narrative
            .replace(regex, userName)
    })
    response.location = response.location.replace(/{{user}}/g, userName)
    response.time = response.time.replace(/{{user}}/g, userName)
    return response
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
    message.content = message.content
        .replace(regex, '{{user}}')
    return message
}
function replaceWithUserPlaceholderMessages(messages: Message[], userName: string): Message[] {
    const regex = new RegExp(userName, 'g')
    return messages.map(message => {
        message.content = message.content
            .replace(regex, '{{user}}')
        return message
    })
}
function replaceWithUserPlaceholderResponse(response: Response, userName: string): Response {
    const regex = new RegExp(userName, 'g')
    response.paragraphs.forEach(paragraph => {
        paragraph.dialogue.content = paragraph.dialogue.content
            .replace(regex, '{{user}}')
        paragraph.narrative = paragraph.narrative
            .replace(regex, '{{user}}')
    })
    response.location = response.location.replace(regex, '{{user}}')
    response.time = response.time.replace(regex, '{{user}}')
    return response
}