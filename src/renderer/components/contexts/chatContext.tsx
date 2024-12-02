import { Response, UserMessage } from "@common/openai";
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
    action: Chat,
): Chat {
    return action;
}

type Props = { children: ReactNode; }
export const ChatProvider: React.FC<Props> = ({
    children
}) => {
    const [chat, dispatchChat] = useReducer(chatReducer, null)

    return (
        <ChatContext.Provider value={chat}>
            <DispatchChatContext.Provider value={dispatchChat}>
                {children}
            </DispatchChatContext.Provider>
        </ChatContext.Provider>
    )
};