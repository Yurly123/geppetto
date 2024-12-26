import React, { useContext } from 'react';
import ChatBar from './ChatBar';
import ResponseContent from './ResponseContent';
import { Response, responseToText, textToResponse, UserMessage } from '@common/openai';
import { MessagesContext } from '@components/contexts';
import Controllers from './Controllers';
import { replaceWithUserName } from '@common/openai/userName';

type Props = {
    userInput: UserMessage;
    response: Response;
    userName: string;
}
const ResponseBox: React.FC<Props> = ({ userInput, response, userName }) => {
    const messages = useContext(MessagesContext)
    let isCurrentChat = false
    let viewingFirstMessage = false
    try {
        const latestResponse = textToResponse(messages.at(-1)?.content)
        isCurrentChat = responseToText(response) === responseToText(latestResponse)
        const firstMessageResponse = textToResponse(messages[0]?.content)
        viewingFirstMessage = responseToText(response) === responseToText(firstMessageResponse)
    } catch { }

    return (
        <div className='response-box'>
            <ResponseContent
                userInput={replaceWithUserName(userInput, userName) as UserMessage}
                response={replaceWithUserName(response, userName)}
                userName={userName}
            />
            <ChatBar enable={isCurrentChat} />
            <Controllers
                isCurrentChat={isCurrentChat}
                isFirstMessage={messages.length === 1}
                viewingFirstMessage={viewingFirstMessage}
            />
        </div>
    );
}

export default ResponseBox;