import React from 'react';

type Props = {
    name: string;
    displayContent: string;
}
const SessionElement: React.FC<Props> = ({ name, displayContent }) => {
    return (
        <div className='session-element'>
            <h3>{name}</h3>
            <p>{displayContent}</p>
        </div>
    )
}

export default SessionElement;