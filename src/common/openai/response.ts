import { Character, Emotion } from "./enum";

export interface Dialogue {
    speaker: Character;
    content: string;
}

export interface Paragraph {
    narrative: string;
    dialogue: Dialogue;
    emotion: Emotion;
}

export interface Response {
    paragraphs: Paragraph[];
    location: string;
    time: string;
}

export function textToResponse(text: string): Response {
    const json = JSON.parse(text);
    assertResponse(json);
    return json;
}
export function responseToText(response: Response): string {
    assertResponse(response);
    return JSON.stringify(response);
}

export function assertResponse(response: Response): asserts response is Response {
    if (!response.paragraphs || !response.location || !response.time ||
        !Array.isArray(response.paragraphs) || typeof response.location !== 'string' || typeof response.time !== 'string')
        throw new Error('Invalid response format');
    for (const paragraph of response.paragraphs) {
        if (!paragraph.narrative || !paragraph.dialogue || !paragraph.emotion ||
            typeof paragraph.narrative !== 'string' || typeof paragraph.emotion !== 'string' ||
            !paragraph.dialogue.speaker || !paragraph.dialogue.content ||
            typeof paragraph.dialogue.speaker !== 'string' || typeof paragraph.dialogue.content !== 'string')
            throw new Error('Invalid response format');
    }
}