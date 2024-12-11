import React, { useState } from 'react';
import SessionButton from './SessionButton';

type Props = {
    sessionButtonEnable?: boolean;
}
const Session: React.FC<Props> = ({ sessionButtonEnable }) => {
    const [enable, setEnable] = useState(false);

    return <>
        {enable &&
            <div className='session'>저장 파일들</div>
        }
        {sessionButtonEnable &&
            <SessionButton onClick={() => setEnable(!enable)} />
        }
    </>
}

export default Session;