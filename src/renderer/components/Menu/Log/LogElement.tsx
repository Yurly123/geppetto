import { Message } from '@common/openai';
import React from 'react';

type Props = {
    message: Message;
    index: number;
}
const LogElement: React.FC<Props> = ({ message, index }) => {
    if (message.role === 'system') return null
    const role = message.role === 'user' ? '사용자' : '제페토'
    return (
        <div className='log-element'>
            <header>
                <h1>{role}</h1>
                <span>{index}</span>
            </header>
            <p>{message.content}</p>
        </div>
    )
}

export default LogElement;