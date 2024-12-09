import React, { ReactNode } from 'react';
import { MessagesProvider } from './messageContext';
import { VoicePlayingProvider } from './voicePlayingContext';
import { SettingProvider } from './settingContext';
import { HelpProvider } from './helpContext';
import { ChatProvider } from './chatContext';
import { FirstMessageProvider } from './firstMessageIndexContext';

export * from './messageContext';
export * from './voicePlayingContext';
export * from './settingContext';
export * from './helpContext';
export * from './chatContext';
export * from './firstMessageIndexContext';

type Props = { children: ReactNode; }
export const ContextsProvider: React.FC<Props> = ({
    children
}) => {
    return (
        <MessagesProvider>
        <VoicePlayingProvider>
        <SettingProvider>
        <HelpProvider>
        <ChatProvider>
        <FirstMessageProvider>
            {children}
        </FirstMessageProvider>
        </ChatProvider>
        </HelpProvider>
        </SettingProvider>
        </VoicePlayingProvider>
        </MessagesProvider>
    )
};