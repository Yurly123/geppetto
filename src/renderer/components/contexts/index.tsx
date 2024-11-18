import React, { ReactNode } from 'react';
import { MessagesProvider } from './messageContext';
import { VoicePlayingProvider } from './voicePlayingContext';
import { SettingProvider } from './settingContext';

export * from './messageContext';
export * from './voicePlayingContext';
export * from './settingContext';

type Props = { children: ReactNode; }
export const ContextsProvider: React.FC<Props> = ({
    children
}) => {
    return (
        <MessagesProvider>
        <VoicePlayingProvider>
        <SettingProvider>
            {children}
        </SettingProvider>
        </VoicePlayingProvider>
        </MessagesProvider>
    )
};