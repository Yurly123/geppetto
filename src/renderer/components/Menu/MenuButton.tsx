import React from 'react';
import '@styles/menu.scss';

type Props = {
    enable?: boolean; 
    onClick?: () => void;
}
const MenuButton: React.FC<Props> = (Props) => {
    const enable = Props.enable === undefined ?
        true : Props.enable;
    return (
        <div
            className={`
                menu-button
                 ${!enable ? 'disabled' : ''}
            `}
            onClick={() =>
                enable && Props.onClick && Props.onClick()
            }
        >
            <h3>메뉴</h3>
        </div>
    )
}

export default MenuButton;