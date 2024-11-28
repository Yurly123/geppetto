import React from 'react';
import '@styles/app.scss';
import { ContextsProvider } from './contexts';
import Chat from './Chat';
import Menu from './Menu';
import HelpMessageBox from './HelpMessageBox';
import InitialLoader from './InitialLoader';

const Application: React.FC = () => {
    return (
        <ContextsProvider>
            <InitialLoader />
            <div className='app'>
                <Chat />
                <Menu />
                <HelpMessageBox />
            </div>
        </ContextsProvider>
    );
};

export default Application;
