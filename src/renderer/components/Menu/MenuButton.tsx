import React from 'react';

type Props = {
    onClick?: () => void;
}
const MenuButton: React.FC<Props> = ({ onClick }) => {
    return (
        <div
            className='menu-button'
            onClick={onClick}
        >
            <h3>메뉴</h3>
        </div>
    )
}

export default MenuButton;