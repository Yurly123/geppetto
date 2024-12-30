import { AssistantMessage, createMessage, textToResponse } from '@common/openai';
import { DispatchChatContext, MessagesContext } from '@components/contexts';
import { HelpTrigger } from '@components/util';
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
            partial: {
                userInput: userInput,
                response: textToResponse(message.content),
                paragraphIndex: 0,
            }
        })
    }

    return <HelpTrigger message='메세지를 클릭하면 이전 사용자 입력과 함께 이 메세지의 내용을 대화창에 불러옵니다.'>
        <div
            className="log-element assistant"
            onClick={handleClick}
        >
            <header>
                <h1>AI</h1>
                <span>
                    {message.token}토큰
                    [{index}]
                </span>
            </header>
            <p>{message.content}</p>
        </div>
    </HelpTrigger>
}

export default AssistantLogElement;  