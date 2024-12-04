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
    emotion: emotion,
    dialogue: dialogue,
});

const response = z.object({
    location: z.string(),
    time: z.string(),
    paragraphs: z.array(paragraph),
});

export const responseSchema = zodResponseFormat(response, 'response');