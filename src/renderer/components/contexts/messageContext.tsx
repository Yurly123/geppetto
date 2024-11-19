import { systemMessage, Message } from "@common/openai";
import React, { Dispatch, ReactNode, createContext, useReducer } from "react";

export const MessagesContext = createContext<Message[]>(null);
export const DispatchMessagesContext = createContext<Dispatch<action>>(null);

type action = Parameters<typeof messagesReducer>[1]
function messagesReducer(
    state: Message[], 
    action: { 
        type: 'add', 
        message: Message 
    },
): Message[] {
    switch (action.type) {
        case 'add':
            return [...state, action.message]
        default: return state
    }
}

type Props = { children: ReactNode; }
export const MessagesProvider: React.FC<Props> = ({
    children
}) => {
    const [messages, dispatchMessages] = useReducer(messagesReducer, [systemMessage()])

    return (
        <MessagesContext.Provider value={messages}>
            <DispatchMessagesContext.Provider value={dispatchMessages}>
                {children}
            </DispatchMessagesContext.Provider>
        </MessagesContext.Provider>
    )
};