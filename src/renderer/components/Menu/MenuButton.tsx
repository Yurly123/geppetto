import React from 'react';
import '@styles/menu.scss';

type Props = {
  onClick?: () => void;
}
const MenuButton: React.FC<Props> = (Props) => {
    return (
        <div className='menu-button' onClick={Props.onClick}>
            <h3>메뉴</h3>
        </div>
    )
}

export default MenuButton;