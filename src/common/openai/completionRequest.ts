import { ChatModel } from "openai/resources";
import { Message } from "./message";
import { GeminiModel } from "@common/google";

export interface CompletionRequest {
    messages: Message[];
    model: ChatModel | GeminiModel;
    apiKey: string;
    geminiMode: boolean;
    impersonate: boolean;
}