import React from 'react';
import OverwriteButton from './OverwriteButton';
import LoadButton from './LoadButton';
import DeleteButton from './DeleteButton';

type Props = {
    name: string;
    displayContent: string;
    isCurrent: boolean;
}
const SessionElement: React.FC<Props> = ({ name, displayContent, isCurrent }) => {
    return (
        <div className='session-element' >
            <header>
                <span className='session-name'>
                    <h2>{name}</h2>
                    {isCurrent && <span>(현재 세션)</span>}
                </span>
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