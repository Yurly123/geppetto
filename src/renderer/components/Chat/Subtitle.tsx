import React, { CSSProperties, useState, useEffect } from 'react';
import '@styles/chat.scss';

type Props = {
  message?: string;
  disappearDuration?: number;
  appearDuration?: number;
  disappearDelay?: number;
}

const DEFAULT_DISAPPEAR_DURATION = 3;
const DEFAULT_APPEAR_DURATION = 0.25;
const DEFAULT_DISAPPEAR_DELAY = 10;

const Subtitle: React.FC<Props> = (props) => {
  const appearDuration = props.appearDuration || DEFAULT_APPEAR_DURATION;
  const disappearDuration = props.disappearDuration || DEFAULT_DISAPPEAR_DURATION;
  const disappearDelay = props.disappearDelay || DEFAULT_DISAPPEAR_DELAY;

  const [style, setStyle] = useState<CSSProperties>({});

  const appear: CSSProperties = {
    animationName: 'appear',
    animationDuration: `${appearDuration}s`,
    opacity: 1,
  }
  const disappear: CSSProperties = {
    animationName: 'disappear',
    animationDuration: `${disappearDuration}s`,
    opacity: 0,
  }

  useEffect(() => {
    if (!props.message) return;
    setStyle(appear);

    const timer = setTimeout(
      () => setStyle(disappear), 
      disappearDelay * 1000
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
