import React, { useState } from 'react';
import '@styles/app.scss';
import { ContextsProvider } from './contexts';
import Chat from './Chat';
import Menu from './Menu';

const Application: React.FC = () => {
    const [menuEnable, setMenuEnable] = useState(false)

    return (
        <ContextsProvider>
            <div className='app'>
                <Chat enable={!menuEnable} />
                <Menu
                    enable={menuEnable}
                    onMenuButtonClick={() => setMenuEnable(!menuEnable)}
                />
            </div>
        </ContextsProvider>
    );
};

export default Application;
