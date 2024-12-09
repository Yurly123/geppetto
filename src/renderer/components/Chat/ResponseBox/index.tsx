import React, { useContext } from 'react';
import ChatBar from './ChatBar';
import ResponseContent from './ResponseContent';
import { Response, responseToText, UserMessage } from '@common/openai';
import { MessagesContext } from '@components/contexts';
import Controllers from './Controllers';

type Props = {
    userInput: UserMessage;
    response: Response;
}
const ResponseBox: React.FC<Props> = ({ userInput, response }) => {
    const messages = useContext(MessagesContext)
    let isCurrentChat = false
    try {
        isCurrentChat = messages.at(-1)?.content
            === responseToText(response)
    } catch { }

    return (
        <div className='response-box'>
            <ResponseContent userInput={userInput} response={response} />
            <ChatBar enable={isCurrentChat}/>
            <Controllers isCurrentChat={isCurrentChat} />
        </div>
    );
}

export default ResponseBox;