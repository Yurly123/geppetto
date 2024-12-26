import { Content } from "@common/google/content";
import { Message } from "./message";
import { Response } from "./response";

export function replaceWithUserName(message: Message, userName?: string): Message;
export function replaceWithUserName(messages: Message[], userName?: string): Message[];
export function replaceWithUserName(response: Response, userName?: string): Response;
export function replaceWithUserName(content: Content, userName?: string): Content;
export function replaceWithUserName(contents: Content[], userName?: string): Content[];

export function replaceWithUserName(
    input: Message | Message[] | Response | Content | Content[],
    userName?: string,
) {
    userName = userName || '{{user}}'
    if (Array.isArray(input)) {
        if (input.length === 0) return input
        if ('content' in input[0]) 
            return (input as Message[]).map(message =>
                replaceWithUserNameMessage(message, userName))
        if ('parts' in input[0])
            return (input as Content[]).map(content =>
                replaceWithUserNameContent(content, userName))
    }

    if ('content' in input) 
        return replaceWithUserNameMessage(input, userName)
    if ('paragraphs' in input) 
        return replaceWithUserNameResponse(input, userName)
    if ('parts' in input)
        return replaceWithUserNameContent(input, userName)
}

function replaceWithUserNameMessage(message: Message, userName: string): Message {
    return {
        ...message,
        content: message.content?.replace(/{{user}}/g, userName)
    }
}
function replaceWithUserNameResponse(response: Response, userName: string): Response {
    return {
        ...response,
        paragraphs: response.paragraphs?.map(paragraph => ({
            ...paragraph,
            dialogue: {
                ...paragraph?.dialogue,
                content: paragraph?.dialogue?.content?.replace(/{{user}}/g, userName)
            },
            narrative: paragraph?.narrative?.replace(/{{user}}/g, userName)
        })),
        location: response.location?.replace(/{{user}}/g, userName),
        time: response.time?.replace(/{{user}}/g, userName),
    }
}
function replaceWithUserNameContent(content: Content, userName: string): Content {
    return {
        ...content,
        parts: [{ text: content.parts[0].text.replace(/{{user}}/g, userName) }]
    }
}