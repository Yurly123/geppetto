import { SSMLOption } from '@common/azure';
import { extractResponse } from '@common/openai';
import { DispatchVoicePlayingContext, MessagesContext, SettingContext } from '@components/contexts';
import { useContext, useEffect, useRef } from 'react';

type Props = {
    ssmlOption?: SSMLOption
}
const VoicePlayer: React.FC<Props> = (props) => {
    const messages = useContext(MessagesContext)
    const dispatchVoicePlaying = useContext(DispatchVoicePlayingContext);
    const setting = useContext(SettingContext)
    const prevLength = useRef(0);

    useEffect(() => {
        window.azure.onSynthesisEnd(async (audio) => {
            const context = new AudioContext();
            const source = context.createBufferSource();
            const buffer = await context.decodeAudioData(audio)
            source.buffer = buffer;
            source.connect(context.destination);
            setTimeout(() => {
                source.start();
                dispatchVoicePlaying(true);
            }, 0)
            setTimeout(() => {
                dispatchVoicePlaying(false);
            }, buffer.duration * 1000)
        })

        return () => window.azure.removeSynthesisEndListeners();
    }, []);

    useEffect(() => {
        if (!setting['TTS토글'].value) return;
        if (messages.length === 0) return;

        // This is to prevent requesting when length change is not intended to generate voice
        const deltaLength = messages.length - prevLength.current;
        prevLength.current = messages.length;
        if (deltaLength !== 1) return 

        const message = messages[messages.length - 1];
        if (message.role !== 'assistant') return;

        const content = extractResponse(message.content);
        window.azure.requestSynthesis(content, props.ssmlOption);
    }, [messages.length, setting['TTS토글']]);

    return null
};

export default VoicePlayer;
