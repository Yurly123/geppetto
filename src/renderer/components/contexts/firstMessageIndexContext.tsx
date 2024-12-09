import { firstMessages } from '@common/openai';
import React, { ReactNode, createContext, useReducer } from "react";

export const FirstMessageIndexContext = createContext<number>(null);
export const DispatchFirstMessageIndexContext = createContext<React.Dispatch<action>>(null);

type action = Parameters<typeof firstMessageIndexReducer>[1]
function firstMessageIndexReducer(
    state: number,
    action: {
        type: 'next' | 'previous' | 'set',
        index?: number,
    }
): number {
    switch (action.type) {
        case 'next': 
            return (state + 1) % firstMessages.length;
        case 'previous':
            return (state - 1 + firstMessages.length) % firstMessages.length;
        case 'set': return action.index;
        default: return state;
    }
}

type Props = { children: ReactNode; }
export const FirstMessageProvider: React.FC<Props> = ({
    children
}) => {
    const [firstMessageIndex, dispatchFirstMessageIndex] = useReducer(firstMessageIndexReducer, 0)

    return (
        <FirstMessageIndexContext.Provider value={firstMessageIndex}>
            <DispatchFirstMessageIndexContext.Provider value={dispatchFirstMessageIndex}>
                {children}
            </DispatchFirstMessageIndexContext.Provider>
        </FirstMessageIndexContext.Provider>
    )
};