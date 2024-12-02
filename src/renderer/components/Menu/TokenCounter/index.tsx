import React, { useContext, useEffect, useState } from 'react';
import { MessagesContext } from '@components/contexts';
import TokenMeter from './TokenMeter';
import { HelpTrigger } from '@components/util';

const TokenCounter: React.FC = () => {
    const messages = useContext(MessagesContext)
    const [count, setCount] = useState(0)
    const max = 5000

    useEffect(() => {
        const count = messages.reduce((acc, message) => {
            if (message.role === 'assistant')
                return acc + message.token
            else return acc 
        }, 0)
        setCount(count)
    }, [messages])

    return (
        <div className='token-counter'>
            <HelpTrigger message={`
                현재까지 제페토에게 응답받은 토큰의 총량입니다. 
                최대치는 ${max}입니다. 
                토큰은 간단히 말하면 AI가 이해하는 단어의 최소단위입니다.
            `}>
                <span>토큰: {
                    count.toString().padStart(4, '0')
                }</span>
                <TokenMeter value={count} max={max} />
            </HelpTrigger>
        </div>
    );
}

export default TokenCounter;
