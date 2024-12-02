import { extractResponse, Message } from '@common/openai';
import React from 'react';

type Props = {
    message: Message;
    index: number;
}
const LogElement: React.FC<Props> = ({ message, index }) => {
    if (message.role === 'system') return null

    let role: string, content: string
    let token: number | undefined
    switch (message.role) {
        case 'user':
            role = '사용자'
            content = message.content
            break
        case 'assistant':
            role = '제페토'
            content = extractResponse(message.content)
            token = message.token
            break
    }
    
    return (
        <div className='log-element'>
            <header>
                <h1>{role}</h1>
                <span>
                    {token ? `${token}토큰 ` : ''}
                    [{index}]
                </span>
            </header>
            <p>{content}</p>
        </div>
    )
}

export default LogElement;