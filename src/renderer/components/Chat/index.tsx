import React, { useContext } from 'react';
import '@styles/chat/index.scss';
import MessageManager from './MessageManager';
import ResponseBox from './ResponseBox';
import Portrait from './Portrait';
import { ChatContext } from '@components/contexts';

type Props = {
    enable?: boolean;
}
const Chat: React.FC<Props> = () => {
    const chat = useContext(ChatContext)
    console.log(chat)

    return (
        <div className='chat side-view'>
            <Portrait />
            <ResponseBox userInput={chat?.userInput} response={chat?.response}/>
            <MessageManager />
        </div>
    );
};

export default Chat;
