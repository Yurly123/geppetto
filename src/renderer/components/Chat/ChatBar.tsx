import React, { FormEvent } from 'react';

type Props = {
    message?: string;
    onMessageChange?: (message: string) => void;
    onMessageSubmit?: (message: string) => void;
    enable?: boolean;
}

const ChatBar: React.FC<Props> = (props) => {
    function handleSumbit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!props.message) return;
        props.onMessageSubmit(props.message);
    }

    return (
        <form
            className='chat-bar'
            onSubmit={handleSumbit}
        >
            <input
                disabled={!props.enable}
                type='text'
                placeholder='메세지 입력'
                value={props.message}
                onChange={(e) => props.onMessageChange(e.target.value)}
            />
        </form>
    );
};

export default ChatBar;
