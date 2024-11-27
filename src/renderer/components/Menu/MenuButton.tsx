import Help from '@components/util/Help';
import React from 'react';

type Props = {
    onClick?: () => void;
}
const MenuButton: React.FC<Props> = ({ onClick }) => {

    return <Help message='메뉴를 엽니다'>
        <div
            className='menu-button'
            onClick={onClick}
        >
            <h3>메뉴</h3>
        </div>
    </Help>
}

export default MenuButton;