import { HelpTrigger } from '@components/util';
import React from 'react';

type Props = {
    message?: string;
    onChange?: (message: string) => void;
    enable?: boolean;
}

const ChatInput: React.FC<Props> = (props) => {
    return <HelpTrigger message='메세지를 입력하고 Enter를 누르면 전송됩니다. 전송하고 수 초 기다리면 응답이 옵니다.'>
        <input
        disabled={!props.enable}
        type='text'
        placeholder='메세지 입력'
        value={props.message}
        onChange={(e) => props.onChange(e.target.value)}
    />
    </HelpTrigger>
};

export default ChatInput;
