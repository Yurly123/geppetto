import React, { FormEvent, useContext, useState } from 'react';
import ChatInput from './ChatInput';
import { createMessage } from '@common/openai';
import { DispatchMessagesContext } from '@components/contexts';
import { HelpTrigger } from '@components/util';

type Props = {
    enable?: boolean;
}
const ChatBar: React.FC<Props> = ({ enable }) => {
    const [input, setInput] = useState('');
    const dispatchMessages = useContext(DispatchMessagesContext);

    function handleSumbit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!input) return;
        setInput('');
        const newMessage = createMessage('user', input);
        dispatchMessages({ type: 'add', message: newMessage });
    }
    return <HelpTrigger message='메세지를 입력하고 Enter를 누르면 전송됩니다. 전송하고 수 초 기다리면 응답이 옵니다.'>
        <form
            className='chat-bar'
            onSubmit={handleSumbit}
        >
            <ChatInput
                enable={enable}
                message={input}
                onChange={setInput}
            />
        </form>
    </HelpTrigger>
};

export default ChatBar;
