import { Message } from '@common/types';
import OpenAI from 'openai';

export async function completion(openai: OpenAI, messages: Message[]) {
    console.log(messages)
    const stream = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages,
        stream: true,
    })
    return stream
}