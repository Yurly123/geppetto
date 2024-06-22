import React, { FormEvent } from 'react';
import '@styles/chat.scss';

type Props = {
  message?: string;
  onMessageChange?: (message: string) => void;
  onMessageSubmit?: (message: string) => void;
}

const ChatBar: React.FC<Props> = (props) => {
  function handleSumbit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!props.message) return;
    props.onMessageSubmit(props.message);
  }

  return (
    <form 
      className='chat-bar'
      onSubmit={handleSumbit}
      >
      <input 
        type='text' 
        placeholder='Type message' 
        value={props.message}
        onChange={(e) => props.onMessageChange(e.target.value)}
      />
    </form>
  );
};

export default ChatBar;
