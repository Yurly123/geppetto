import { assertAssistantHasToken, createMessage, textToResponse } from '@common/openai';
import { firstMessage } from '@common/openai';
import { DispatchChatContext, DispatchMessagesContext, MessagesContext, SettingContext } from '@components/contexts';
import { useContext, useEffect } from 'react';

const MessageManager: React.FC = () => {
    const setting = useContext(SettingContext);
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

        const message = messages.at(-1)
        if (message.role !== 'user') return

        window.openai.requestCompletion({
            messages: messages,
            model: setting['GPT모델'].value,
            apiKey: setting['OpenAI API키'].value,
        });
        dispatchChat({ type: 'initialize' });
        dispatchChat({ type: 'changePartial', partial: { userInput: message } });
    }, [messages]);

    useEffect(() => {
        if (messages.length === 0) return;
        const assistantMessage = messages.at(-1);
        const userMessage = messages.at(-2);
        if (!assistantMessage || !userMessage ||
            assistantMessage.role !== 'assistant' ||
            userMessage.role !== 'user') return;
        assertAssistantHasToken(assistantMessage);

        window.store.saveMessages(messages);
        dispatchChat({
            type: 'changeAll', chat: {
                userInput: userMessage,
                response: textToResponse(assistantMessage.content),
                paragraphIndex: 0
            }
        });
    }, [messages]);

    useEffect(() => {
        if (messages.length !== 0) return;
        dispatchMessages({ type: 'add', message: firstMessage })
        dispatchChat({
            type: 'changePartial', partial: {
                response: textToResponse(firstMessage.content),
            }
        });
    }, [messages]);

    return null
};

export default MessageManager;
