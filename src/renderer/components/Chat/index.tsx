import React, { useEffect } from 'react';
import '@styles/chat.scss';
import ChatBar from './ChatBar';
import Subtitle from './Subtitle';

const Chat: React.FC = () => {
  const [message, setMessage] = React.useState<string>('');
  const [messages, setMessages] = React.useState<string[]>([]); 
  const [subtitleVisible, setSubtitleVisible] = React.useState<boolean>(false);

  useEffect(() => {
    if (!subtitleVisible) return;
    const length = messages[messages.length - 1]?.length || 0;
    const timer = setTimeout(() => {
      setSubtitleVisible(false);
    }, 2000 + length * 100);
    return () => clearTimeout(timer);
  }, [subtitleVisible]);

  return (
    <div className='chat'>
      <Subtitle 
        message={messages[messages.length - 1]} 
        isVisible={subtitleVisible}
      />
      <div style={{ height: '100%' }}></div>
      <ChatBar 
        message={message}
        onMessageChange={setMessage}
        onMessageSubmit={(message) => {
          console.log('Submit:', message);
          setMessages([...messages, message]);
          setMessage('');
          setSubtitleVisible(true);
        }}
      />
    </div>
  );
};

export default Chat;
