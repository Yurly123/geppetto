import { Background, Character, CharacterWithoutUser, Emotion } from '@common/openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';

const emotion = z.nativeEnum(Emotion);
const character = z.nativeEnum(Character);
const characterWithoutUser = z.nativeEnum(CharacterWithoutUser);
const background = z.nativeEnum(Background);

const dialogue = (impersonate: boolean) => z.object({
    speaker: (impersonate ? character : characterWithoutUser)
        .describe('Character speaking'),
    content: z.string().describe('Content of the speech'),
}).describe('Speech of a character');

const paragraph = (impersonate: boolean) => z.object({
    narrative: z.string().describe('Description of the situation'),
    emotion: emotion.describe('Emotion of the character'),
    dialogue: dialogue(impersonate),
}).describe('Single act of character interaction');

const response = (impersonate: boolean) => z.object({
    location: z.string().describe('Current location of situation'),
    time: z.string().describe('Current time of situation'),
    paragraphs: z.array(paragraph(impersonate)).describe('List of paragraphs'),
    background: background.describe('Background image of the situation'),
}).describe('Your generated situation');

export const responseSchema = (impersonate: boolean) =>
    zodResponseFormat(response(impersonate), 'response');