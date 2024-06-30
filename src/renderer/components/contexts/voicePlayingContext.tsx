import React, { ReactNode, createContext, useReducer } from "react";

export const VoicePlayingContext = createContext<boolean>(false);
export const DispatchVoicePlayingContext = createContext<React.Dispatch<boolean>>(null);

function voicePlayingReducer(
    state: boolean,
    action: boolean
): boolean {
    return action;
}

type Props = { children: ReactNode; }
export const VoicePlayingProvider: React.FC<Props> = ({
    children
}) => {
    const [voicePlaying, dispatchVoicePlaying] = useReducer(voicePlayingReducer, false)

    return (
        <VoicePlayingContext.Provider value={voicePlaying}>
            <DispatchVoicePlayingContext.Provider value={dispatchVoicePlaying}>
                {children}
            </DispatchVoicePlayingContext.Provider>
        </VoicePlayingContext.Provider>
    )
};