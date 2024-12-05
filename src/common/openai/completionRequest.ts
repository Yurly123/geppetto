import { ChatModel } from "openai/resources";
import { Message } from "./message";

export interface CompletionRequest {
    messages: Message[];
    model: ChatModel;
    apiKey: string;
}