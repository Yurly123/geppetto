import { CompletionRequest } from "@common/openai";
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { rendererChannel } from "@main/openai/channels";
import { WebContents } from "electron";
import { responseSchema } from "./schema";
import { createContent, messageToContent } from "@common/google/content";
import { buildPrompt } from "./prompt";

export async function handleCompletion(sender: WebContents, request: CompletionRequest) {
    const prevMessages = request.messages.slice(0, -1)
    const userInput = request.messages.at(-1)

    const genAI = new GoogleGenerativeAI(request.apiKey)
    const model = genAI.getGenerativeModel({
        model: request.model,
        generationConfig: {
            responseMimeType: 'application/json',
            responseSchema: responseSchema,
        },
        safetySettings: [{
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        }, {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        }, {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        }, {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        }],
    })
    sender.send(rendererChannel.COMPLETION_START)

    const chat = model.startChat({
        history: [
            createContent('user', buildPrompt(prevMessages, userInput)),
            ...prevMessages.map(message => messageToContent(message)),
        ],
    })

    const result = await chat.sendMessageStream(userInput.content)

    let content = ''
    for await (const chunk of result.stream) {
        if (chunk.candidates[0].finishReason) {
            content += chunk.text()
            sender.send(rendererChannel.COMPLETION_END,
                content, chunk.usageMetadata.candidatesTokenCount
            );
        }
        else {
            const data = chunk.text()
            content += data
            sender.send(rendererChannel.COMPLETION_CHUNK, data);
        }
    }
}