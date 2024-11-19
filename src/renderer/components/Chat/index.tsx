import React, { useState, useEffect, useReducer, useContext } from 'react';
import '@styles/chat.scss';
import ChatBar from './ChatBar';
import Subtitle from './Subtitle';
import { DispatchMessagesContext, MessagesContext, SettingContext } from '@components/contexts';
import { createMessage } from '@common/openai';
import Voice from './Voice';

type Props = {
  enable?: boolean;
}
const Chat: React.FC<Props> = ({ enable = true }) => {
  const [input, setInput] = useState('');
  const [subtitle, dispatchSubtitle] = useReducer(subtitleReducer, '');
  const dispatchMessages = useContext(DispatchMessagesContext);
  const messages = useContext(MessagesContext);
  const setting = useContext(SettingContext);

  useEffect(() => {
    window.openai.onCompletionChunk((chunk) => {
      dispatchSubtitle({ type: 'data', data: chunk })
    });

    window.openai.onCompletionEnd((content) => {
      dispatchMessages({ type: 'add', message: createMessage('assistant', content) });
    });

    return () => {
      window.openai.removeCompletionChunkListeners();
      window.openai.removeCompletionEndListeners();
    }
  }, []);

  function handleSubmit(message: string) {
    setInput('');
    dispatchSubtitle({ type: 'clear' });

    const newMessage = createMessage('user', message);
    dispatchMessages({ type: 'add', message: newMessage });
    window.openai.requestCompletion(messages.concat(newMessage));
  }

  const disappearDelay = 10 + subtitle.length / 10;

  return (
    <div className='chat'>
      <Subtitle message={subtitle} disappearDelay={disappearDelay} />
      <div style={{ height: '100%' }}></div>
      <ChatBar 
        enable={enable}
        message={input}
        onMessageChange={setInput}
        onMessageSubmit={handleSubmit}
      />
      <Voice ssmlOption={{
        pitch: 10,
        rate: 30,
        volume: 50,
      }} />
    </div>
  );
};

export default Chat;

function subtitleReducer(
  state: string, 
  action: { type: 'clear' | 'data', data?: string }
) {
  action.data = action.data || '';
  switch (action.type) {
    case 'clear':
      return action.data;
    case 'data':
      return state + action.data;
  }
}