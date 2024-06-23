import { Message } from "@common/types";
import React, { Dispatch, ReactNode, createContext, useReducer } from "react";

export const MessagesContext = createContext<Message[]>([]);
export const DispatchMessagesContext = createContext<Dispatch<action>>(() => {});

type action = Parameters<typeof messagesReducer>[1]
function messagesReducer(
    state: Message[], 
    action: { 
        type: 'add', 
        message?: Message 
    },
): Message[] {
    if (action.type === 'add' && action.message) 
        state.push(action.message)
    return state
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