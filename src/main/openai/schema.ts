import { Character, Emotion } from '@common/openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';

const emotion = z.nativeEnum(Emotion);
const character = z.nativeEnum(Character);

const dialogue = z.object({
    speaker: character,
    content: z.string(),
});

const paragraph = z.object({
    narrative: z.string(),
    dialogue: dialogue,
    emotion: emotion,
});

const response = z.object({
    paragraphs: z.array(paragraph),
    location: z.string(),
    time: z.string(),
});

export const responseSchema = zodResponseFormat(response, 'response');