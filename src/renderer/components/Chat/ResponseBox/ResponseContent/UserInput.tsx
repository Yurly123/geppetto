import { UserMessage } from '@common/openai';
import React from 'react';

type Props = {
    userInput: UserMessage
}
const UserInput: React.FC<Props> = ({ userInput }) => {
    return <div className='response-element'>
        <p><span className='dialogue'>
            "{userInput?.content}"
        </span></p>
    </div>;
}

export default UserInput;