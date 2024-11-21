import React from 'react';
import '@styles/menu.scss';
import MenuButton from './MenuButton';
import Setting from './Setting';

type Props = {
    menuEnable: boolean;
    onMenuButtonClick: () => void;
}
const Menu: React.FC<Props> = (props) => {
    const [logEnable, setLogEnable] = React.useState(false);
    return <>
        {props.menuEnable &&
            <div className='menu'>
                <Setting />
            </div>}
        <MenuButton
            enable={!logEnable}
            onClick={props.onMenuButtonClick}
        />
    </>
}

export default Menu;
export { MenuButton }