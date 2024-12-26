import { CompletionRequest } from '@common/openai';
import OpenAI from 'openai';
import { buildPrompt } from './prompt';
import { responseSchema } from './schema';

export async function completion(openai: OpenAI, request: CompletionRequest) {
    const stream = await openai.chat.completions.create({
        model: request.model,
        messages: buildPrompt(request),
        stream: true,
        max_completion_tokens: 1000,
        stream_options: {
            include_usage: true
        },
        response_format: {
            type: 'json_schema',
            json_schema: responseSchema(request.impersonate).json_schema,
        },
    })
    return stream
}
