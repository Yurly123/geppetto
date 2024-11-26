import { Message } from '@common/openai';
import OpenAI from 'openai';
import { buildPrompt } from './prompt';

export async function completion(openai: OpenAI, messages: Message[]) {
    const requestMessages = buildPrompt(
        messages, messages[messages.length - 1]
    )
    const stream = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: requestMessages,
        stream: true,
        max_completion_tokens: 500,
    })
    return stream
}
