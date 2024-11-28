import React from 'react';

type Props = {
    message?: string;
    onChange?: (message: string) => void;
    enable?: boolean;
}

const ChatInput: React.FC<Props> = (props) => {
    return <input
        disabled={!props.enable}
        type='text'
        placeholder='메세지 입력'
        value={props.message}
        onChange={(e) => props.onChange(e.target.value)}
    />
};

export default ChatInput;
