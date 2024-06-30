import React, { CSSProperties, useState, useEffect } from 'react';
import '@styles/chat.scss';

type Props = {
  message?: string;
  disappearDuration?: number;
  appearDuration?: number;
  disappearDelay?: number;
}

const Subtitle: React.FC<Props> = (props) => {
  props.appearDuration ??= 3;
  props.disappearDuration ??= 0.25;
  props.disappearDelay ??= 10;

  const [style, setStyle] = useState<CSSProperties>({});

  const appear: CSSProperties = {
    animationName: 'appear',
    animationDuration: `${props.appearDuration}s`,
    opacity: 1,
  }
  const disappear: CSSProperties = {
    animationName: 'disappear',
    animationDuration: `${props.appearDuration}s`,
    opacity: 0,
  }

  useEffect(() => {
    if (!props.message) return;
    setStyle(appear);

    const timer = setTimeout(
      () => setStyle(disappear), 
      props.disappearDelay * 1000
    );
    return () => clearTimeout(timer);
  }, [props.message]);

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
