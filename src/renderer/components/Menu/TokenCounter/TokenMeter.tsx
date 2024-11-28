import React from 'react';

type Props = {
    value: number;
    max: number;
}
const TokenMeter: React.FC<Props> = (props) => {
    return (
        <meter
            className='token-meter'
            value={props.value}
            min={0}
            max={props.max}
        />
    );
}

export default TokenMeter;