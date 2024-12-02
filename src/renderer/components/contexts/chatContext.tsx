import { Character, Emotion, Response, UserMessage } from "@common/openai";
import React, { ReactNode, createContext, useReducer } from "react";

export interface Chat {
    userInput: UserMessage;
    response: Response;
    paragraphIndex: number;
}

export const ChatContext = createContext<Chat>(null);
export const DispatchChatContext = createContext<React.Dispatch<action>>(null);

type action = Parameters<typeof chatReducer>[1]
function chatReducer(
    state: Chat,
    action: {
        type: 'changeAll' | 'changeIndex' | 'initialize' | 'changePartial',
        chat?: Chat,
        partial?: Partial<Chat>,
        index?: number,
    },
): Chat {
    switch (action.type) {
        case 'changeAll':
            return action.chat || state;
        case 'changeIndex':
            if (action.index === undefined ||
                action.index < 0 ||
                action.index >= state.response.paragraphs.length
            ) return state;
            return { ...state, paragraphIndex: action.index }
        case 'initialize': return initialState;
        case 'changePartial':
            return { ...state, ...action.partial }
        default:
            return state;
    }
}

const initialState: Chat = {
    userInput: { role: 'user', content: '' },
    paragraphIndex: 0,
    response: {
        paragraphs: [{
            narrative: '',
            dialogue: { speaker: Character.Geppetto, content: '' },
            emotion: Emotion.Neutral,
        }],
        time: '',
        location: ''
    }
}

type Props = { children: ReactNode; }
export const ChatProvider: React.FC<Props> = ({
    children
}) => {
    const [chat, dispatchChat] = useReducer(chatReducer, initialState)

    return (
        <ChatContext.Provider value={chat}>
            <DispatchChatContext.Provider value={dispatchChat}>
                {children}
            </DispatchChatContext.Provider>
        </ChatContext.Provider>
    )
};