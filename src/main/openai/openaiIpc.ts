import { ipcMain } from "electron";
import OpenAI from 'openai';
import { completion } from "./completion";
import { ChatCompletionChunk } from "openai/resources";

export function registerOpenaiIpc(openai: OpenAI) {
  ipcMain.handle('completion', async (event, message: string) => {
    const stream = await completion(openai, message);
    for await (const chunk of stream) {
      const data = chunk.choices[0].delta.content || '';
      console.log(data)
      event.sender.send('completion-chunk', data);
    }
  });
}