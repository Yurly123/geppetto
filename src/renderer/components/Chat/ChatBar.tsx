import React, { ChangeEventHandler, FormEventHandler, useEffect, useState } from 'react';
import '@styles/chat.scss';

type Props = {
  message?: string;
  onMessageChange?: (message: string) => void;
  onMessageSubmit?: () => void;
}

const ChatBar: React.FC<Props> = (props) => {
  const [focus, setFocus] = useState<boolean>(false);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.repeat) return; // Prevent repeatation of toggle when key holding
      if (!focus) return;
      if (e.key === 'Enter' && !e.shiftKey) 
        props.onMessageSubmit()
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [focus, props.message]);

  return (
    <>
      <input 
        type='text' 
        className='chat' 
        placeholder='Type message' 
        value={props.message}
        onChange={(e) => props.onMessageChange(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </>
  );
};

export default ChatBar;
