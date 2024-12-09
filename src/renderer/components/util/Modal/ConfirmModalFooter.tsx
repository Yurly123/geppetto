import React from 'react';

type Props = {
    close: () => void;
    onClose?: (result: boolean) => void;
}
const ConfirmModalFooter: React.FC<Props> = ({ close, onClose }) => {
    return <>
        <div
            className='modal-button'
            onClick={() => {
                close();
                onClose?.(true);
            }}
        >
            확인
        </div>
        <div
            className='modal-button'
            onClick={() => {
                close();
                onClose?.(false);
            }}
        >
            취소
        </div>
    </>
}

export default ConfirmModalFooter;