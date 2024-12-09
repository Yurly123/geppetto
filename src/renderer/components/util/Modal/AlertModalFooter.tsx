import React from 'react';

type Props = {
    close: () => void;
    onClose?: () => void;
}
const AlertModalFooter: React.FC<Props> = ({ close, onClose }) => {
    return <>
        <div
            className='modal-button'
            onClick={() => {
                close();
                onClose?.();
            }}
        >
            닫기
        </div>
    </>
}

export default AlertModalFooter;