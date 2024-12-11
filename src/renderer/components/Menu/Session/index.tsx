import React, { useEffect } from 'react';

const Session: React.FC = () => {
    useEffect(() => {
        window.store.getAllSessions().then(console.log);
    }, []);

    return <div className='session'>
        저장 파일들
    </div>
}

export default Session;
export { default as SessionButton } from './SessionButton';