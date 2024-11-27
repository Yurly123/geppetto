import React, { useState } from 'react';
import '@styles/app.scss';
import { ContextsProvider } from './contexts';
import Chat from './Chat';
import Menu from './Menu';
import HelpMessageBox from './HelpMessageBox';

const Application: React.FC = () => {
    const [menuEnable, setMenuEnable] = useState(false)

    return (
        <ContextsProvider>
            <div className='app'>
                <Chat />
                <Menu
                    enable={menuEnable}
                    onMenuButtonClick={() => setMenuEnable(!menuEnable)}
                />
                <HelpMessageBox />
            </div>
        </ContextsProvider>
    );
};

export default Application;
