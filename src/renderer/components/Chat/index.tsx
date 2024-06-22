import React from 'react';
import '@styles/chat.scss';
import ChatBar from './ChatBar';
import Subtitle from './Subtitle';

const Chat: React.FC = () => {
  const [message, setMessage] = React.useState<string>('');

  return (
    <div className='chat'>
      <Subtitle message={message} />
      <div style={{ height: '100%' }}></div>
      <ChatBar 
        message={message}
        onMessageChange={setMessage}
        onMessageSubmit={(message) => {
          console.log('Submit:', message);
          setMessage('');
        }}
      />
    </div>
  );
};

export default Chat;
