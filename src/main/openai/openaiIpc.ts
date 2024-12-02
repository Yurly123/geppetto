import { ipcMain } from "electron";
import OpenAI from 'openai';
import { completion } from "./completion";
import { mainChannel, rendererChannel } from "./channels";
import { Message, textToResponse } from "@common/openai";
import { ChatCompletionChunk } from "openai/resources";

export function registerOpenaiIpc() {
    const openai = new OpenAI()

    ipcMain.handle(mainChannel.COMPLETION, async ({ sender }, messages: Message[]) => {
        sender.send(rendererChannel.COMPLETION_START)

        const stream = await completion(openai, messages);

        let content = ''
        for await (const chunk of stream) {
            if (chunk.usage) 
                handleUsage(chunk);
            else if (!chunk.choices[0].finish_reason)
                handleChunk(chunk);
        }

        function handleChunk(chunk: ChatCompletionChunk) {
            const data = chunk.choices[0].delta.content || '';
            content += data;
            sender.send(rendererChannel.COMPLETION_CHUNK, data);
        }
        function handleUsage(chunk: ChatCompletionChunk) {
            sender.send(rendererChannel.COMPLETION_END, 
                content, chunk.usage.completion_tokens
            );
        }
    });
}