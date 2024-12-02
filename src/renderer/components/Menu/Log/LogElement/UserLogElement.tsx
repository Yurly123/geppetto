import { UserMessage } from '@common/openai';
import React from 'react';

type Props = {
    message: UserMessage;
    index: number;
}
const UserLogElement: React.FC<Props> = ({ index, message }) => {
    return (
        <div className="log-element">
            <header>
                <h1>사용자</h1>
                <span>[{index}]</span>
            </header>
            <p>{message.content}</p>
        </div>
    )
}

export default UserLogElement;  