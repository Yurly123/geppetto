import { assertAssistantHasToken, Message } from "@common/openai";
import React, { Dispatch, ReactNode, createContext, useReducer } from "react";

export const MessagesContext = createContext<Message[]>(null);
export const DispatchMessagesContext = createContext<Dispatch<action>>(null);

type action = Parameters<typeof messagesReducer>[1]
function messagesReducer(
    state: Message[], 
    action: { 
        type: 'add' | 'changeAll' | 'pop' | 'changeIndex', 
        message?: Message,
        messages?: Message[],
        index?: number,
    },
): Message[] {
    switch (action.type) {
        case 'add': if (!action.message) return state;
            assertAssistantHasToken(action.message);
            return [...state, action.message]
        case 'changeAll': if (!action.messages) return state;
            action.messages.forEach(assertAssistantHasToken);
            return action.messages
        case 'pop': return state.slice(0, -1)
        case 'changeIndex': if (action.index === undefined || !action.message) return state;
            if (action.message.role !== state.at(action.index).role)
                 return state;
            return [
                ...state.slice(0, action.index),
                action.message,
                ...state.slice(action.index + 1),
            ]
        default: return state
    }
}

type Props = { children: ReactNode; }
export const MessagesProvider: React.FC<Props> = ({
    children
}) => {
    const [messages, dispatchMessages] = useReducer(messagesReducer, [])

    return (
        <MessagesContext.Provider value={messages}>
            <DispatchMessagesContext.Provider value={dispatchMessages}>
                {children}
            </DispatchMessagesContext.Provider>
        </MessagesContext.Provider>
    )
};