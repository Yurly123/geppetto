import { Message } from '@common/openai';
import OpenAI from 'openai';
import { buildPrompt } from './prompt';
import { responseSchema } from './schema';

export async function completion(openai: OpenAI, messages: Message[]) {
    const requestMessages = buildPrompt(
        messages, messages[messages.length - 1]
    )
    const stream = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: requestMessages,
        stream: true,
        max_completion_tokens: 500,
        stream_options: {
            include_usage: true
        },
        response_format: {
            type: 'json_schema',
            json_schema: responseSchema.json_schema,
        },
    })
    console.log(stream)
    return stream
}
