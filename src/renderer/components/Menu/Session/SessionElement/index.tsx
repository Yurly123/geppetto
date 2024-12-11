import React from 'react';
import OverwriteButton from './OverwriteButton';
import LoadButton from './LoadButton';
import DeleteButton from './DeleteButton';

type Props = {
    name: string;
    displayContent: string;
}
const SessionElement: React.FC<Props> = ({ name, displayContent }) => {
    return (
        <div className='session-element' >
            <header>
                <h2>{name}</h2>
                <div className='controllers'>
                    <OverwriteButton name={name} />
                    <LoadButton name={name} />
                    <DeleteButton name={name} />
                </div>
            </header>
            <p>{displayContent}</p>
        </div>
    )
}

export default SessionElement;