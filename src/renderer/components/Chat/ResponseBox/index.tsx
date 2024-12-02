import React from 'react';
import ChatBar from './ChatBar';
import ResponseContent from './ResponseContent';
import { Response, UserMessage } from '@common/openai';

type Props = {
    userInput: UserMessage;
    response: Response;
}
const ResponseBox: React.FC<Props> = ({ userInput, response }) => {
    return (
        <div className='response-box'>
            <ResponseContent userInput={userInput} response={response} />
            <ChatBar enable={true} />
        </div>
    );
}

export default ResponseBox;