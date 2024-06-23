import React, { useState, useEffect, useReducer } from 'react';
import '@styles/chat.scss';
import ChatBar from './ChatBar';
import Subtitle from './Subtitle';

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
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [subtitle, dispatchSubtitle] = useReducer(subtitleReducer, '');

  useEffect(() => {
    window.openai.onCompletionChunk((chunk) => {
      dispatchSubtitle({ type: 'data', data: chunk })
    });

    window.openai.onCompletionEnd(() => {
      setSubtitleVisible(false);
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
          setInput('');
          setSubtitleVisible(true);
          window.openai.requestCompletion(message);
          dispatchSubtitle({ type:'clear' });
        }}
      />
    </div>
  );
};

export default Chat;
