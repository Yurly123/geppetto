import { MessagesContext } from '@components/contexts';
import { useContext, useEffect } from 'react';

const Voice: React.FC = () => {
  const messages = useContext(MessagesContext)
  useEffect(() => {
    if (messages.length === 0) return;
    const message = messages[messages.length - 1];
    if (message.role !== 'assistant') return;
    
    window.azure.onSynthesisEnd(async (audio) => {
      const context = new AudioContext();
      const source = context.createBufferSource();
      const buffer = await context.decodeAudioData(audio)
      source.buffer = buffer;
      source.connect(context.destination);
      source.start(0);
    })

    window.azure.requestSynthesis(message.content);
  }, [messages.length]);
  return null;
};

export default Voice;
