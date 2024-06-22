import React from 'react';
import '@styles/chat.scss';

type Props = {
  message?: string;
}

const Subtitle: React.FC<Props> = (props) => {
  return (
    <div className='chat-subtitle'>
      <div className='chat-subtitle-box'>
        <span>
          {props.message}
        </span>
      </div>
    </div>
  );
};

export default Subtitle;
