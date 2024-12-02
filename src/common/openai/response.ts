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
