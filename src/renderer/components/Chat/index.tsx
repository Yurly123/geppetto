import React, { useContext } from 'react';
import '@styles/chat/index.scss';
import ResponseBox from './ResponseBox';
import Portrait from './Portrait';
import { ChatContext, SettingContext } from '@components/contexts';
import StreamHandler from './StreamHandler';
import Backgorund from './Background';

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
            <Backgorund background={chat?.response?.background} />
            <ResponseBox
                userInput={chat?.userInput}
                response={chat?.response}
                userName={chat?.userName || '{{user}}'}
            />
            <StreamHandler />
        </div>
    );
};

export default Chat;
