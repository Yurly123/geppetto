import { assertAssistantHasToken, AssistantMessage, CompletionRequest, createMessage, firstMessages, textToResponse } from '@common/openai';
import { DispatchChatContext, DispatchMessagesContext, FirstMessageIndexContext, MessagesContext, SettingContext } from '@components/contexts';
import { useContext, useEffect } from 'react';

const MessageManager: React.FC = () => {
    const setting = useContext(SettingContext);
    const messages = useContext(MessagesContext)
    const firstMessageIndex = useContext(FirstMessageIndexContext);
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
        if (messages.length !== 1) return;
        const firstMessage = messages.at(0) as AssistantMessage;
        dispatchChat({
            type: 'changePartial', partial: {
                response: textToResponse(firstMessage.content),
                userInput: createMessage('user', ''),
                paragraphIndex: 0
            }
        });
        window.store.saveMessages({ messages });
    }, [messages]);

    useEffect(() => {
        if (messages.length === 0) return;

        const message = messages.at(-1)
        if (message.role !== 'user') return

        const geminiMode = setting['제미니 모드'].value;
        const request: CompletionRequest = {
            messages,
            geminiMode,
            model: geminiMode ? setting['Gemini모델'].value : setting['GPT모델'].value,
            apiKey: geminiMode ? setting['Gemini API키'].value : setting['OpenAI API키'].value,
            impersonate: setting['사칭 허용'].value
        }
        window.openai.requestCompletion(request);
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

        window.store.getCurrentSession().then(currentSession => {
            window.store.saveSession(currentSession, { messages });
        })
        window.store.saveMessages({ messages });
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
        const firstMessage = firstMessages[firstMessageIndex];
        dispatchMessages({ type: 'add', message: firstMessage })
        dispatchChat({
            type: 'changePartial', partial: {
                response: textToResponse(firstMessage.content),
                paragraphIndex: 0
            }
        });
    }, [messages]);

    return null
};

export default MessageManager;
