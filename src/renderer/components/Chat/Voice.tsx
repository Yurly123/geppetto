import { MessagesContext } from '@components/contexts';
import { useContext, useEffect } from 'react';

const Voice: React.FC = () => {
  const messages = useContext(MessagesContext)
  useEffect(() => {
    if (messages.length === 0) return;
    const message = messages[messages.length - 1];
    if (message.role !== 'assistant') return;
    
    window.azure.onSynthesisEnd((audio) => {
      console.log('Audio:', audio)
      console.timeEnd('Voice')
    })

    console.time('Voice')
    window.azure.requestSynthesis(message.content);

    console.log('Voice:', message.content)
    
  }, [messages.length]);
  return null;
};

export default Voice;
