import React, { useContext } from 'react';
import '@styles/chat/index.scss';
import ResponseBox from './ResponseBox';
import Portrait from './Portrait';
import { ChatContext, SettingContext } from '@components/contexts';
import StreamHandler from './StreamHandler';

type Props = {
    enable?: boolean;
}
const Chat: React.FC<Props> = () => {
    const setting = useContext(SettingContext)
    const chat = useContext(ChatContext)
    const paragraph = chat?.response?.paragraphs[chat?.paragraphIndex];

    return (
        <div className={`chat ${setting['보기 테마'].value}`}>
            <Portrait
                character={paragraph.dialogue?.speaker}
                emotion={paragraph.emotion}
            />
            <ResponseBox
                userInput={chat?.userInput}
                response={chat?.response}
            />
            <StreamHandler />
        </div>
    );
};

export default Chat;
