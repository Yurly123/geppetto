import React, { useContext } from 'react';
import '@styles/chat/index.scss';
import MessageManager from './MessageManager';
import ResponseBox from './ResponseBox';
import Portrait from './Portrait';
import { ChatContext } from '@components/contexts';
import StreamHandler from './StreamHandler';

type Props = {
    enable?: boolean;
}
const Chat: React.FC<Props> = () => {
    const chat = useContext(ChatContext)
    const paragraph = chat?.response?.paragraphs[chat?.paragraphIndex];

    return (
        <div className='chat pop-up'>
            <Portrait
                character={paragraph.dialogue?.speaker}
                emotion={paragraph.emotion}
            />
            <ResponseBox
                userInput={chat?.userInput}
                response={chat?.response}
            />
            <MessageManager />
            <StreamHandler />
        </div>
    );
};

export default Chat;
