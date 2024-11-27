import React, { ReactNode, createContext, useReducer } from "react";

export interface Help {
    message: string;
    open: boolean;
    x: number; y: number;
}

export const HelpContext = createContext<Help>(null);
export const DispatchHelpContext = createContext<React.Dispatch<action>>(null);

type action = Parameters<typeof helpReducer>[1]
function helpReducer(
    state: Help,
    action: Help
): Help {
    return action;
}

type Props = { children: ReactNode; }
export const HelpProvider: React.FC<Props> = ({
    children
}) => {
    const [help, dispatchHelp] = useReducer(helpReducer, {
        message: '', open: false, x: 0, y: 0,
    })

    return (
        <HelpContext.Provider value={help}>
            <DispatchHelpContext.Provider value={dispatchHelp}>
                {children}
            </DispatchHelpContext.Provider>
        </HelpContext.Provider>
    )
};