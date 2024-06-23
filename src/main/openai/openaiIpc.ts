import { ipcMain } from "electron";
import OpenAI from 'openai';
import { completion } from "./completion";
import { mainChannel, rendererChannel } from "./channels";

export function registerOpenaiIpc(openai: OpenAI) {
  ipcMain.handle(mainChannel.completion, async (event, message: string) => {
    const stream = await completion(openai, message);

    for await (const chunk of stream) {
      const data = chunk.choices[0].delta.content || '';
      event.sender.send(rendererChannel.completionChunk, data);

      if (chunk.choices[0].finish_reason === 'stop') 
        event.sender.send(rendererChannel.completionEnd);
    }
  });
}