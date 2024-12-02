import React, { useContext } from 'react';
import '@styles/chat.scss';
import ChatBar from './ChatBar';
import Subtitle from './Subtitle';
import VoicePlayer from './VoicePlayer';
import { SettingContext } from '@components/contexts';
import MessageManager from './MessageManager';
import ResponseBox from './ResponseBox';
import Portrait from './Portrait';

type Props = {
    enable?: boolean;
}
const Chat: React.FC<Props> = ({ enable = true }) => {
    const setting = useContext(SettingContext);

    return (
        <div className='chat'>
            <ResponseBox />
            <Portrait />
            <ChatBar enable={enable} />
            {/* voice player is disabled for now 
            <VoicePlayer ssmlOption={{
                pitch: 10,
                rate: 30,
                volume: setting['TTS음량'].value,
            }} />
             */}
            <MessageManager />
        </div>
    );
};

export default Chat;
