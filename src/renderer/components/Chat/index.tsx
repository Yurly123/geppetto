import React, { useState, useEffect, useReducer, useContext } from 'react';
import '@styles/chat.scss';
import ChatBar from './ChatBar';
import Subtitle from './Subtitle';
import { DispatchMessagesContext, MessagesContext } from '@components/contexts';
import { createMessage } from '@common/openai';

const Chat: React.FC = () => {
  const [input, setInput] = useState('');
  const [subtitle, dispatchSubtitle] = useReducer(subtitleReducer, '');
  const dispatchMessages = useContext(DispatchMessagesContext);
  const messages = useContext(MessagesContext);

  useEffect(() => {
    window.openai.onCompletionChunk((chunk) => {
      dispatchSubtitle({ type: 'data', data: chunk })
    });

    window.openai.onCompletionEnd((content) => {
      dispatchMessages({ type: 'add', message: createMessage('assistant', content) });
    });
  }, []);

  function handleSubmit(message: string) {
    setInput('');
    dispatchSubtitle({ type: 'clear' });

    const newMessage = createMessage('user', message);
    dispatchMessages({ type: 'add', message: newMessage });
    window.openai.requestCompletion(messages.concat(newMessage));
  }

  return (
    <div className='chat'>
      <Subtitle message={subtitle} />
      <div style={{ height: '100%' }}></div>
      <ChatBar 
        message={input}
        onMessageChange={setInput}
        onMessageSubmit={handleSubmit}
      />
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