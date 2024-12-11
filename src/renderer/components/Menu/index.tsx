import React, { useState } from 'react';
import '@styles/menu/index.scss';
import MenuButton from './MenuButton';
import Setting from './Setting';
import Log from './Log';
import StorageFolderButton from './StorageFolderButton';
import TokenCounter from './TokenCounter';
import Session from './Session';

const Menu: React.FC = () => {
    const [menuEnable, setMenuEnable] = useState(false);
    return <>
        {menuEnable &&
            <div className='menu'>
                <Setting />
                <StorageFolderButton />
            </div>}
        <TokenCounter />
        <MenuButton onClick={() => setMenuEnable(!menuEnable)} />
        <Log logButtonEnable={menuEnable} />
        <Session sessionButtonEnable={menuEnable} />
    </>
}

export default Menu;
export { MenuButton }