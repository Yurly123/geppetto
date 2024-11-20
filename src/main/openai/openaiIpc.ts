import { ipcMain } from "electron";
import OpenAI from 'openai';
import { completion } from "./completion";
import { mainChannel, rendererChannel } from "./channels";
import { Message } from "@common/openai";

export function registerOpenaiIpc() {
  const openai = new OpenAI()

  ipcMain.handle(mainChannel.COMPLETION, async ({ sender }, messages: Message[]) => {
    const stream = await completion(openai, messages);

    let content = ''
    for await (const chunk of stream) {
      const data = chunk.choices[0].delta.content || '';
      content += data;
      sender.send(rendererChannel.COMPLETION_CHUNK, data);

      if (chunk.choices[0].finish_reason === 'stop') {
        sender.send(rendererChannel.COMPLETION_END, content);
      }
    }
  });
}