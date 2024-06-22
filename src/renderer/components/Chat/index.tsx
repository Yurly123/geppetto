import React from 'react';
import '@styles/chat.scss';
import ChatBar from './ChatBar';

const Chat: React.FC = () => {
  const [message, setMessage] = React.useState<string>('');

  return (
    <ChatBar 
      message={message}
      onMessageChange={setMessage}
      onMessageSubmit={(message) => {
        console.log('Submit:', message);
        setMessage('');
      }}
    />
  );
};

export default Chat;
