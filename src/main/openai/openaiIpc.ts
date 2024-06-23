import { ipcMain } from "electron";
import OpenAI from 'openai';
import { completion } from "./completion";

export function registerOpenaiIpc(openai: OpenAI) {
  ipcMain.handle('completion', async (_, message: string) => {
    return await completion(openai, message);
  });
}