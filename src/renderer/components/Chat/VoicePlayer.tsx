import { SSMLOption } from '@common/azure';
import { DispatchVoicePlayingContext, MessagesContext } from '@components/contexts';
import { useContext, useEffect, useState } from 'react';

type Props = {
    ssmlOption?: SSMLOption
}
const VoicePlayer: React.FC<Props> = (props) => {
    const messages = useContext(MessagesContext)
    const dispatchVoicePlaying = useContext(DispatchVoicePlayingContext);
    const [prevLength, setPrevLength] = useState(0);

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
        if (messages.length === 0) return;

        // This is to prevent requesting when loading messages
        const deltaLength = messages.length - prevLength;
        setPrevLength(messages.length);
        if (deltaLength > 1) return 

        const message = messages[messages.length - 1];
        if (message.role !== 'assistant') return;

        window.azure.requestSynthesis(message.content, props.ssmlOption);
    }, [messages.length]);

    return null
};

export default VoicePlayer;
