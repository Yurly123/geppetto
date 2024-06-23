import React, { CSSProperties, useState, useEffect } from 'react';
import '@styles/chat.scss';

type Props = {
  message?: string;
  isVisible?: boolean;
  disappearDelay?: number;
  appearDelay?: number;
}

const DEFAULT_DISAPPEAR_DELAY = 3;
const DEFAULT_APPEAR_DELAY = 0.25;

const Subtitle: React.FC<Props> = (props) => {
  const [style, setStyle] = useState<CSSProperties>({});

  const disappear: CSSProperties = {
    animation: `${
      props.disappearDelay || DEFAULT_DISAPPEAR_DELAY
    }s disappear`,
    opacity: 0,
  }
  const appear: CSSProperties = {
    animation: `${
      props.appearDelay || DEFAULT_APPEAR_DELAY
    }s appear`,
    opacity: 1,
  }

  useEffect(() => {
    if (props.isVisible) setStyle(appear);
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
