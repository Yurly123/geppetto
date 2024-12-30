import { HelpTrigger } from '@components/util';
import React from 'react';

type Props = {
    onClick?: () => void;
}
const SessionButton: React.FC<Props> = ({ onClick }) => {
    return <HelpTrigger message='대화를 저장할 수 있는 단위인 세션을 조작합니다.'>
        <div
            className='session-button'
            onClick={onClick}
        >
            <h3>저장</h3>
        </div>
    </HelpTrigger>
}

export default SessionButton;