import React, { ReactNode } from 'react';
import { MessagesProvider } from './messageContext';
import { VoicePlayingProvider } from './voicePlayingContext';

export * from './messageContext';
export * from './voicePlayingContext';

type Props = { children: ReactNode; }
export const ContextsProvider: React.FC<Props> = ({
    children
}) => {
    return (
        <MessagesProvider>
        <VoicePlayingProvider>
            {children}
        </VoicePlayingProvider>
        </MessagesProvider>
    )
};