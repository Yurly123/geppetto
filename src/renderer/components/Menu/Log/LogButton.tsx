import React from 'react';

type Props = {
    onClick?: () => void;
}
const LogButton: React.FC<Props> = (props) => {
    return (
        <div
            className='log-button'
            onClick={props.onClick}
        >
            <h3>로그</h3>
        </div>
    )
}

export default LogButton;