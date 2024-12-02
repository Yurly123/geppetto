import { assertAssistantHasToken, createMessage, textToResponse } from '@common/openai';
import { DispatchChatContext, DispatchMessagesContext, MessagesContext } from '@components/contexts';
import { useContext, useEffect } from 'react';

const MessageManager: React.FC = () => {
    const messages = useContext(MessagesContext)
    const dispatchMessages = useContext(DispatchMessagesContext);
    const dispatchChat = useContext(DispatchChatContext);

    useEffect(() => {
        window.openai.onCompletionEnd((content, token) => {
            dispatchMessages({
                type: 'add',
                message: createMessage('assistant', content, token)
            });
        });
        return () => window.openai.removeCompletionEndListeners();
    }, []);

    useEffect(() => {
        if (messages.length === 0) return;
        window.store.saveMessages(messages);

        const message = messages.at(-1)
        if (message.role !== 'user') return

        window.openai.requestCompletion(messages);
        dispatchChat({ type: 'initialize' });
        dispatchChat({ type: 'changePartial', partial: { userInput: message } });
    }, [messages.length]);

    useEffect(() => {
        if (messages.length === 0) return;
        const assistantMessage = messages.at(-1);
        const userMessage = messages.at(-2);
        if (!assistantMessage || !userMessage ||
            assistantMessage.role !== 'assistant' ||
            userMessage.role !== 'user') return;
        assertAssistantHasToken(assistantMessage);

        dispatchChat({
            type: 'changeAll', chat: {
                userInput: userMessage,
                response: textToResponse(assistantMessage.content),
                paragraphIndex: 0
            }
        });
    }, [messages.length]);

    return null
};

export default MessageManager;
