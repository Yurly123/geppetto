import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources';

export async function completion(openai: OpenAI, prompt: string) {
    const messages: ChatCompletionMessageParam[] = [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt },
    ]
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages,
    })
    return response.choices[0].message.content
}