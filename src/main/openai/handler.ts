import { CompletionRequest } from "@common/openai";
import { WebContents } from "electron";
import OpenAI from "openai";
import { rendererChannel } from "./channels";
import { completion } from "./completion";
import { Stream } from "openai/streaming";
import { ChatCompletionChunk } from "openai/resources";

export async function handleCompletion(sender: WebContents, request: CompletionRequest) {
    const openai = await openaiSetup(request);
    sender.send(rendererChannel.COMPLETION_START)
    const stream = await completion(openai, request);
    handleStream(stream, sender);
}

async function openaiSetup(request: CompletionRequest) {
    const openai = new OpenAI({
        apiKey: request.apiKey
    })

    try { await openai.models.list() }
    catch (error) { 
        throw new Error('OpenAI 연결 실패: ' + error) 
    }

    return openai
}

async function handleStream(stream: Stream<ChatCompletionChunk>, sender: WebContents) {
    let content = ''
    for await (const chunk of stream) {
        if (chunk.usage) {
            sender.send(rendererChannel.COMPLETION_END,
                content, chunk.usage.completion_tokens
            );
        }
        else if (!chunk.choices[0].finish_reason) {
            const data = chunk.choices[0].delta.content || '';
            content += data;
            sender.send(rendererChannel.COMPLETION_CHUNK, data);
        }
    }
}