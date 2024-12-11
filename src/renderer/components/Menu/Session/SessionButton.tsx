import React from 'react';

type Props = {
    onClick?: () => void;
}
const SessionButton: React.FC<Props> = ({ onClick }) => {
    return <div
        className='session-button'
        onClick={onClick}
    >
        <h3>저장</h3>
    </div>
}

export default SessionButton;