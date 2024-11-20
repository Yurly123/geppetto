import React, { useState, useEffect, useContext } from 'react';
import '@styles/chat.scss';
import ChatBar from './ChatBar';
import Subtitle from './Subtitle';
import { DispatchMessagesContext, MessagesContext, SettingContext } from '@components/contexts';
import { createMessage } from '@common/openai';
import Voice from './Voice';

type Props = {
    enable?: boolean;
}
const Chat: React.FC<Props> = ({ enable = true }) => {
    const [input, setInput] = useState('');
    const dispatchMessages = useContext(DispatchMessagesContext);
    const messages = useContext(MessagesContext);
    const setting = useContext(SettingContext);

    useEffect(() => {
        window.openai.onCompletionEnd((content) => {
            dispatchMessages({ type: 'add', message: createMessage('assistant', content) });
        });

        return () => {
            window.openai.removeCompletionEndListeners();
        }
    }, []);

    function handleSubmit(message: string) {
        setInput('');

        const newMessage = createMessage('user', message);
        dispatchMessages({ type: 'add', message: newMessage });
        window.openai.requestCompletion(messages.concat(newMessage));
    }

    return (
        <div className='chat'>
            <Subtitle />
            <div style={{ height: '100%' }}></div>
            <ChatBar
                enable={enable}
                message={input}
                onMessageChange={setInput}
                onMessageSubmit={handleSubmit}
            />
            <Voice ssmlOption={{
                pitch: 10,
                rate: 30,
                volume: setting['TTS음량'].value,
            }} />
        </div>
    );
};

export default Chat;
