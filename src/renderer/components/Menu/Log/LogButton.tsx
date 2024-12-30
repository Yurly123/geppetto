import { HelpTrigger } from '@components/util';
import React from 'react';

type Props = {
    onClick?: () => void;
}
const LogButton: React.FC<Props> = (props) => {
    return <HelpTrigger message='현재 세션의 로그를 엽니다. 로그 안의 각 메세지를 누르면 해당 메세지의 내용을 볼 수 있습니다.'>
        <div
            className='log-button'
            onClick={props.onClick}
        >
            <h3>로그</h3>
        </div>
    </HelpTrigger>
}

export default LogButton;