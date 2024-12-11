import React, { useState } from 'react';
import '@styles/menu/index.scss';
import MenuButton from './MenuButton';
import Setting from './Setting';
import Log, { LogButton } from './Log';
import Session, { SessionButton } from './Session';
import StorageFolderButton from './StorageFolderButton';
import TokenCounter from './TokenCounter';

const Menu: React.FC = () => {
    const [menuEnable, setMenuEnable] = useState(false);
    const [logEnable, setLogEnable] = useState(false);
    const [sessionEnable, setSessionEnable] = useState(false);
    return <>
        {menuEnable &&
            <div className='menu'>
                <Setting />
                <StorageFolderButton />
                <LogButton onClick={() => setLogEnable(!logEnable)} />
                <SessionButton onClick={() => setSessionEnable(!sessionEnable)} />
            </div>
        }
        <TokenCounter />
        <MenuButton onClick={() => setMenuEnable(!menuEnable)} />

        {logEnable && <>
            <Log />
            <LogButton onClick={() => setLogEnable(!logEnable)} />
        </>}
        {sessionEnable && <>
            <Session />
            <SessionButton onClick={() => setSessionEnable(!sessionEnable)} />
        </>}
    </>
}

export default Menu;
export { MenuButton }