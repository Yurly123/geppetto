import React from 'react';
import '@styles/menu/index.scss';
import MenuButton from './MenuButton';
import Setting from './Setting';
import Log from './Log';
import StorageFolderButton from './StorageFolderButton';

type Props = {
    enable?: boolean;
    onMenuButtonClick?: () => void;
}
const Menu: React.FC<Props> = (props) => {
    const menuEnable = props.enable === undefined ? true : props.enable;
    const [logEnable, setLogEnable] = React.useState(false);
    return <>
        {menuEnable &&
            <div className='menu'>
                <Setting />
                <StorageFolderButton />
            </div>}
        <MenuButton
            onClick={props.onMenuButtonClick}
        />
        <Log
            logButtonEnable={menuEnable}
            enable={logEnable}
            onLogButtonClick={() => setLogEnable(!logEnable)}
        />
    </>
}

export default Menu;
export { MenuButton }