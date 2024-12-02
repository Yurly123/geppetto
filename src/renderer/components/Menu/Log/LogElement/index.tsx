import { Message } from '@common/openai';
import React from 'react';
import AssistantLogElement from './AssistantLogElement';
import UserLogElement from './UserLogElement';

type Props = {
    message: Message;
    index: number;
}
const LogElement: React.FC<Props> = ({ message, index }) => {
    switch (message.role) {
        case 'assistant':
            return <AssistantLogElement index={index} message={message} />
        case 'user':
            return <UserLogElement index={index} message={message} />
        default:
            return null;
    }
}

export default LogElement;