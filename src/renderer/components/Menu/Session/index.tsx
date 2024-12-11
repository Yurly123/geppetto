import React from 'react';
import SessionBox from './SessionBox';

const Session: React.FC = () => {
    return <div className='session'>
        <SessionBox />
    </div>
}

export default Session;
export { default as SessionButton } from './SessionButton';