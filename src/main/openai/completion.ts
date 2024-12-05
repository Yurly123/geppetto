import { CompletionRequest } from '@common/openai';
import OpenAI from 'openai';
import { buildPrompt } from './prompt';
import { responseSchema } from './schema';

export async function completion(openai: OpenAI, request: CompletionRequest) {
    const requestMessages = buildPrompt(
        request.messages, request.messages.at(-1)
    )
    openai.apiKey = request.apiKey

    const stream = await openai.chat.completions.create({
        model: request.model,
        messages: requestMessages,
        stream: true,
        max_completion_tokens: 1000,
        stream_options: {
            include_usage: true
        },
        response_format: {
            type: 'json_schema',
            json_schema: responseSchema.json_schema,
        },
    })
    return stream
}
