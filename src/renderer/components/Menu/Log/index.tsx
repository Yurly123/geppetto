import React from 'react';
import LogButton from './LogButton';

type Props = {
    enable?: boolean;
    onLogButtonClick?: () => void;
}
const Log: React.FC<Props> = (props) => {
    const enable = props.enable === undefined ? true : props.enable;
    return <>
        {enable &&
            <div className='log'>
                asdf
            </div>}
        <LogButton onClick={props.onLogButtonClick} />
    </>
}

export default Log;