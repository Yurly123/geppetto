import React from 'react';
import '@styles/menu.scss';
import MenuButton from './MenuButton';
import Setting from './Setting';

const Menu: React.FC = () => {
    return <div className='menu'>
        <Setting />
    </div>
}

export default Menu;
export { MenuButton }