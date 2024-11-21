import React from 'react';
import '@styles/menu.scss';
import MenuButton from './MenuButton';
import Setting from './Setting';
import Log from './Log';

type Props = {
    enable?: boolean;
    onMenuButtonClick?: () => void;
}
const Menu: React.FC<Props> = (props) => {
    const enable = props.enable === undefined ? true : props.enable;
    const [logEnable, setLogEnable] = React.useState(false);
    return <>
        {enable &&
            <div className='menu'>
                <Setting />
            </div>}
        <MenuButton
            onClick={props.onMenuButtonClick}
        />
        {enable &&

        <Log
            logButtonEnable={enable}
            enable={logEnable}
            onLogButtonClick={() => setLogEnable(!logEnable)}
        />
        }
    </>
}

export default Menu;
export { MenuButton }