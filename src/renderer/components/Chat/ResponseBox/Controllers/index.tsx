import React from 'react';
import Reroll from './Reroll';
import InputChange from './InputChange';
import DeleteMessage from './DeleteMessage';

type Props = {
    isCurrentChat?: boolean;
}
const Controllers: React.FC<Props> = ({ isCurrentChat }) => {
    return (
        <div className='controllers'>
            {isCurrentChat ?
                <Reroll /> :
                <DeleteMessage />}
            <InputChange />
        </div>
    );
}

export default Controllers;