import Help from '@components/util/Help';
import React from 'react';

type Props = {
    message?: string;
    onChange?: (message: string) => void;
    enable?: boolean;
}

const ChatInput: React.FC<Props> = (props) => {
    return <Help message='메세지'>
        <input
        disabled={!props.enable}
        type='text'
        placeholder='메세지 입력'
        value={props.message}
        onChange={(e) => props.onChange(e.target.value)}
    />
    </Help>
};

export default ChatInput;
