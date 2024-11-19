import { ipcMain } from "electron";
import { SpeechSynthesizer } from "microsoft-cognitiveservices-speech-sdk";
import { mainChannel, rendererChannel } from "./channels";
import { SSMLOption, Viseme } from "@common/azure";

function attachSsml(
    synthesizer: SpeechSynthesizer, 
    content: string,
    option: SSMLOption,
) {
    option = { pitch: 0, rate: 0, volume: 100, ...option }
    const baseSsml = synthesizer.buildSsml('*').split('*')
    const ssml = `<prosody 
            pitch="+${option.pitch}%"
            rate="+${option.rate}%"
            volume="${option.volume}"
        > 
            ${content}
        </prosody>`
    return baseSsml[0] + ssml + baseSsml[1]
}

export function registerAzureIpc(synthesizer: SpeechSynthesizer) {
    ipcMain.handle(mainChannel.SYNTHESIS, (
        _,
        content: string,
        option?: SSMLOption,
    ) => {
        const input = attachSsml(synthesizer, content, option)
        synthesizer.speakSsmlAsync(input, null, console.error)
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