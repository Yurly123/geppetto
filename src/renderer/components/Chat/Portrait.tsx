import React from 'react';
import portrait from '@assets/images/gepptto/neutral.png'
import { Dialogue, Emotion } from '@common/openai';

type Props = {
    dialogue: Dialogue;
    emotion: Emotion;
}
const Portrait: React.FC<Props> = ({ dialogue, emotion }) => {
    return (
        <div className='portrait'>
            <img src={portrait} alt='portrait' />
        </div>
    );
}

export default Portrait;