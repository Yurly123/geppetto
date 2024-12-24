import React from 'react';
import Reroll from './Reroll';
import InputChange from './InputChange';
import DeleteMessage from './DeleteMessage';
import SelectFirstMessage from './SelectFirstMessage';
import UserNameInput from './UserNameInput';

type Props = {
    isCurrentChat?: boolean;
    isFirstMessage?: boolean;
    viewingFirstMessage?: boolean;
}
const Controllers: React.FC<Props> = ({ isCurrentChat, isFirstMessage, viewingFirstMessage }) => {
    if (isFirstMessage)
        return <div className='controllers'>
            <SelectFirstMessage />
            <UserNameInput />
        </div>
    if (viewingFirstMessage)
        return null

    return (
        <div className='controllers'>
            {isCurrentChat && <Reroll />}
            <InputChange />
            <DeleteMessage />
        </div>
    );
}

export default Controllers;