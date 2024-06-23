import React, { useEffect } from 'react';
import '@styles/chat.scss';
import ChatBar from './ChatBar';
import Subtitle from './Subtitle';

const Chat: React.FC = () => {
  const [input, setInput] = React.useState<string>('');
  const [messages, setMessages] = React.useState<string[]>([]); 
  const [subtitleVisible, setSubtitleVisible] = React.useState<boolean>(false);
  const [subtitle, setSubtitle] = React.useState<string>('');
  const [delta, setDelta] = React.useState<string>('');

  function messageCompletion(message: string) {
    window.openai.requestCompletion(message)
  }

  useEffect(() => {
    window.openai.onCompletionChunk((chunk) => {
      setDelta(chunk);
    });
  }, []);
  useEffect(() => {
    if (!delta) return;
    setSubtitle(subtitle + delta);
  }, [delta]);
  
  //useEffect(() => {
    //if (!subtitleVisible) return;
    //const length = subtitle.length || 0;
    //const timer = setTimeout(() => {
      //setSubtitleVisible(false);
    //}, 2000 + length * 100);
    //return () => clearTimeout(timer);
  //}, [subtitleVisible]);

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
          setSubtitle('');
        }}
      />
    </div>
  );
};

export default Chat;
