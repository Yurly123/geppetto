import React from 'react';
import Reroll from './Reroll';
import InputChange from './InputChange';
import DeleteMessage from './DeleteMessage';
import SelectFirstMessage from './SelectFirstMessage';

type Props = {
    isCurrentChat?: boolean;
    isFirstMessage?: boolean;
}
const Controllers: React.FC<Props> = ({ isCurrentChat, isFirstMessage }) => {
    if (isFirstMessage)
        return <div className='controllers'>
            <SelectFirstMessage />
        </div>

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