import React from 'react';

type Props = {
    name: string;
    displayContent: string;
}
const SessionElement: React.FC<Props> = ({ name, displayContent }) => {
    return (
        <div className='session-element'>
            <header>
                <h2>{name}</h2>
            </header>
            <p>{displayContent}</p>
        </div>
    )
}

export default SessionElement;