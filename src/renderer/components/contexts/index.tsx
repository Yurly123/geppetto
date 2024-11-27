import React, { ReactNode } from 'react';
import { MessagesProvider } from './messageContext';
import { VoicePlayingProvider } from './voicePlayingContext';
import { SettingProvider } from './settingContext';
import { HelpProvider } from './helpContext';

export * from './messageContext';
export * from './voicePlayingContext';
export * from './settingContext';
export * from './helpContext';

type Props = { children: ReactNode; }
export const ContextsProvider: React.FC<Props> = ({
    children
}) => {
    return (
        <MessagesProvider>
        <VoicePlayingProvider>
        <SettingProvider>
        <HelpProvider>
            {children}
        </HelpProvider>
        </SettingProvider>
        </VoicePlayingProvider>
        </MessagesProvider>
    )
};