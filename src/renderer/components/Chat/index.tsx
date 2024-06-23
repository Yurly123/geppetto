import React, { useState, useEffect, useReducer } from 'react';
import '@styles/chat.scss';
import ChatBar from './ChatBar';
import Subtitle from './Subtitle';

function subtitleReducer(
  state: string, 
  action: { type: 'clear' | 'data', data?: string}
) {
  if (action.type === 'clear') {
    return action.data || '';
  }
  else if (action.type === 'data') {
    return state + (action?.data || '');
  }
}

const Chat: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<string[]>([]); 
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [subtitle, dispatchSubtitle] = useReducer(subtitleReducer, '');

  function messageCompletion(message: string) {
    window.openai.requestCompletion(message)
  }

  useEffect(() => {
    window.openai.onCompletionChunk((chunk) => {
      console.log(chunk)
      dispatchSubtitle({ type: 'data', data: chunk })
    });
  }, []);

  return (
    <div className='chat'>
      <Subtitle 
        message={subtitle} 
        isVisible={subtitleVisible}
      />
      <div style={{ height: '100%' }}></div>
      <ChatBar 
        message={input}
        onMessageChange={setInput}
        onMessageSubmit={(message) => {
          console.log('Submit:', message);
          setMessages([...messages, message]);
          setInput('');
          setSubtitleVisible(true);
          messageCompletion(message);
          dispatchSubtitle({ type:'clear' });
        }}
      />
    </div>
  );
};

export default Chat;
