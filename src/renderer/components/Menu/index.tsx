import React, { useState } from 'react';
import '@styles/menu/index.scss';
import MenuButton from './MenuButton';
import Setting from './Setting';
import Log from './Log';
import StorageFolderButton from './StorageFolderButton';
import TokenCounter from './TokenCounter';

const Menu: React.FC = () => {
    const [menuEnable, setMenuEnable] = useState(false);
    const [logEnable, setLogEnable] = useState(false);
    return <>
        {menuEnable &&
            <div className='menu'>
                <Setting />
                <StorageFolderButton />
            </div>}
        <MenuButton
            onClick={() => setMenuEnable(!menuEnable)}
        />
        <TokenCounter />
        <Log
            logButtonEnable={menuEnable}
            enable={logEnable}
            onLogButtonClick={() => setLogEnable(!logEnable)}
        />
    </>
}

export default Menu;
export { MenuButton }