import { createMessage } from '@common/openai';
import { DispatchMessagesContext, MessagesContext } from '@components/contexts';
import { useContext, useEffect } from 'react';

const MessageManager: React.FC = () => {
    const messages = useContext(MessagesContext)
    const dispatchMessages = useContext(DispatchMessagesContext);

    useEffect(() => {
        window.openai.onCompletionEnd((content) => {
            dispatchMessages({ type: 'add', message: createMessage('assistant', content) });
        });
        window.store.loadMessages().then((messages) => {
            dispatchMessages({ type: 'changeAll', messages });
        })
        return () => window.openai.removeCompletionEndListeners();
    }, []);

    useEffect(() => {
        if (messages.length === 0) return;
        window.store.saveMessages(messages);

        const message = messages[messages.length - 1];
        if (message.role === 'user')
            window.openai.requestCompletion(messages);
    }, [messages.length]);

    return null
};

export default MessageManager;
