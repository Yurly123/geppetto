import { UserMessage } from '@common/openai';
import React from 'react';

type Props = {
    userInput: UserMessage
}

const UserInput: React.FC<Props> = ({ userInput }) => {
    function formatContent(content: string) {
        const parts = content.split(/"([^"]*)"/);
        return parts.map((part, i) => i % 2 === 1 ?
            <span key={i} className='dialogue'>
                "{part}"
            </span>
            : part
        );
    };

    return <div className='response-element'>
        <p>{formatContent(userInput.content)}</p>
    </div>;
}

export default UserInput;