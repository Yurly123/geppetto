import { HelpTrigger } from '@components/util';
import React from 'react';

type Props = {
    onClick?: () => void;
}
const MenuButton: React.FC<Props> = ({ onClick }) => {

    return <HelpTrigger message='메뉴를 엽니다'>
        <div
            className='menu-button'
            onClick={onClick}
        >
            <h3>메뉴</h3>
        </div>
    </HelpTrigger>
}

export default MenuButton;