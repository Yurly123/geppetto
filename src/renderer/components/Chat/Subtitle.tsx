import React, { CSSProperties, useState, useEffect } from 'react';
import '@styles/chat.scss';

type Props = {
  message?: string;
  isVisible?: boolean;
  disappearDelay?: number;
}

const Subtitle: React.FC<Props> = (props) => {
  const [style, setStyle] = useState<CSSProperties>({});
  const disappear: CSSProperties = {
    animation: `${props.disappearDelay || 3}s disappear`,
    opacity: 0,
  }

  useEffect(() => {
    if (props.isVisible) setStyle({});
    else setStyle(disappear);
  }, [props.isVisible]);

  return props.message ? (
    <div className='chat-subtitle' style={style}>
      <div className='chat-subtitle-box'>
        <span>
          {props.message}
        </span>
      </div>
    </div>
  ) : null;
};

export default Subtitle;
