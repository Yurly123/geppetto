import { ipcMain } from "electron";
import { SpeechSynthesizer } from "microsoft-cognitiveservices-speech-sdk";
import { mainChannel, rendererChannel } from "./channels";
import { Viseme } from "@common/types";

function attachSsml(synthesizer: SpeechSynthesizer, content: string) {
    let baseSsml = synthesizer.buildSsml('')
    baseSsml = baseSsml.split('</voice></speak>')[0]

    let ssml = `<prosody pitch="+5" rate="+20%">${content}</prosody>`
    ssml = `${baseSsml}${ssml}</voice></speak>`

    return ssml
}

export function registerAzureIpc(synthesizer: SpeechSynthesizer) {
    ipcMain.handle(mainChannel.SYNTHESIS, (_, content: string) => {
        const input = attachSsml(synthesizer, content)
        synthesizer.speakSsmlAsync(input)
    });

    ipcMain.handle(mainChannel.SYNTHESIS_VISEME, ({ sender }) => {
        synthesizer.visemeReceived = (_, e) => {
            const viseme: Viseme = {
                visemeId: e.visemeId,
                offset: e.audioOffset / 10000,
            }
            sender.send(rendererChannel.SYNTHESIS_VISEME, viseme)
        }
    })

    ipcMain.handle(mainChannel.SYNTHESIS_END, ({ sender }) => {
        synthesizer.synthesisCompleted = (_, e) => {
            const audio = e.result.audioData
            sender.send(rendererChannel.SYNTHESIS_END, audio)
        }
    })
}