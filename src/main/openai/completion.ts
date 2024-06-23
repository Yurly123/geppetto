import { Message } from '@common/types';
import OpenAI from 'openai';

export async function completion(openai: OpenAI, prompt: string) {
    const messages: Message[] = [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt },
    ]
    const stream = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages,
        stream: true,
    })
    return stream
}