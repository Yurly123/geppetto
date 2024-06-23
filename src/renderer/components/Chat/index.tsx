import React, { useState, useEffect, useReducer, useContext } from 'react';
import '@styles/chat.scss';
import ChatBar from './ChatBar';
import Subtitle from './Subtitle';
import { DispatchMessagesContext, MessagesContext } from '@components/contexts';
import { createMessage } from '@common/message';

function subtitleReducer(
  state: string, 
  action: { type: 'clear' | 'data', data?: string }
) {
  action.data = action.data || '';
  if (action.type === 'clear') {
    return action.data
  }
  else if (action.type === 'data') {
    return state + action.data
  }
}

const Chat: React.FC = () => {
  const [input, setInput] = useState('');
  const [subtitle, dispatchSubtitle] = useReducer(subtitleReducer, '');
  const dispatchMessages = useContext(DispatchMessagesContext);
  const messages = useContext(MessagesContext);

  useEffect(() => {
    window.openai.onCompletionChunk((chunk) => {
      dispatchSubtitle({ type: 'data', data: chunk })
    });
  }, []);

  return (
    <div className='chat'>
      <Subtitle message={subtitle} />
      <div style={{ height: '100%' }}></div>
      <ChatBar 
        message={input}
        onMessageChange={setInput}
        onMessageSubmit={(message) => {
          setInput('');
          window.openai.requestCompletion(message);
          dispatchSubtitle({ type:'clear' });
          dispatchMessages({ type: 'add', message: createMessage('user', message) });
        }}
      />
    </div>
  );
};

export default Chat;
