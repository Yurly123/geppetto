import React, { FormEvent, useContext, useState } from 'react';
import ChatInput from './ChatInput';
import { createMessage } from '@common/openai';
import { DispatchMessagesContext } from '@components/contexts';

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

    return <form
        className='chat-bar'
        onSubmit={handleSumbit}
    >
        <ChatInput
            enable={enable}
            message={input}
            onChange={setInput}
        />
    </form>
};

export default ChatBar;
