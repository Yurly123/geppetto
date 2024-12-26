import { AssistantMessage, createMessage, textToResponse } from '@common/openai';
import { DispatchChatContext, MessagesContext } from '@components/contexts';
import React, { useContext } from 'react';

type Props = {
    message: AssistantMessage;
    index: number;
}
const AssistantLogElement: React.FC<Props> = ({ index, message }) => {
    const dispatchChat = useContext(DispatchChatContext)
    const messages = useContext(MessagesContext)

    function handleClick() {
        let userInput = messages.at(index - 1)
        if (userInput.role !== 'user')
            userInput = createMessage('user', '')
        dispatchChat({
            type: 'changePartial',
            chat: {
                userInput: userInput,
                response: textToResponse(message.content),
                paragraphIndex: 0,
            }
        })
    }

    return (
        <div
            className="log-element assistant"
            onClick={handleClick}
        >
            <header>
                <h1>GPT</h1>
                <span>
                    {message.token}토큰 
                    [{index}]
                </span>
            </header>
            <p>{message.content}</p>
        </div>
    )
}

export default AssistantLogElement;  