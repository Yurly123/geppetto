import React, { ReactNode } from 'react';
import { MessagesProvider } from './messageContext';

export * from './messageContext';

type Props = { children: ReactNode; }
export const ContextsProvider: React.FC<Props> = ({
    children
}) => {
    return (
        <MessagesProvider>
            {children}
        </MessagesProvider>
    )
};