import React from 'react';
import '@styles/app.scss';
import { ContextsProvider } from './contexts';
import Chat from './Chat';
import Menu from './Menu';
import HelpMessageBox from './HelpMessageBox';
import InitialLoader from './InitialLoader';
import ErrorHandler from './ErrorHandler';
import MessageManager from './MessageManager';

const Application: React.FC = () => {
    return (
        <ContextsProvider>
            <div className='app'>
                <Chat />
                <Menu />
                <HelpMessageBox />
            </div>
            <MessageManager />
            <InitialLoader />
            <ErrorHandler />
        </ContextsProvider>
    );
};

export default Application;
