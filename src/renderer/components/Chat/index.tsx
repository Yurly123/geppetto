import React from 'react';
import '@styles/chat/index.scss';
import MessageManager from './MessageManager';
import ResponseBox from './ResponseBox';
import Portrait from './Portrait';

type Props = {
    enable?: boolean;
}
const Chat: React.FC<Props> = () => {
    return (
        <div className='chat side-view'>
            <Portrait />
            <ResponseBox />
            <MessageManager />
        </div>
    );
};

export default Chat;
