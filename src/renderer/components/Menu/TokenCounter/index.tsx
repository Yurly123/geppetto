import React, { useContext } from 'react';
import { MessagesContext } from '@components/contexts';

const TokenCounter: React.FC = () => {
    const messages = useContext(MessagesContext)

    return (
        <div className='token-counter'>
            토큰 카운터
        </div>
    );
}

export default TokenCounter;
