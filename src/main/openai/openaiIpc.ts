import { ipcMain } from "electron";
import OpenAI from 'openai';
import { completion } from "./completion";
import { mainChannel, rendererChannel } from "./channels";
import { Message } from "@common/types";

export function registerOpenaiIpc(openai: OpenAI) {
  ipcMain.handle(mainChannel.completion, async ({ sender }, messages: Message[]) => {
    const stream = await completion(openai, messages);

    let content = ''
    for await (const chunk of stream) {
      const data = chunk.choices[0].delta.content || '';
      content += data;
      sender.send(rendererChannel.completionChunk, data);

      if (chunk.choices[0].finish_reason === 'stop') {
        sender.send(rendererChannel.completionEnd, content);
      }
    }
  });
}