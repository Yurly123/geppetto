import { UserMessage } from '@common/openai';
import React from 'react';

type Props = {
    userInput: UserMessage
}
const UserInput: React.FC<Props> = ({ userInput }) => {
    return <div className='response-element'>
        <p>
            {userInput?.content}
        </p>
    </div>;
}

export default UserInput;