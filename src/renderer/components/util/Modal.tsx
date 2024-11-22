import React, { forwardRef, useImperativeHandle, useState } from 'react';
import ReactModal from 'react-modal';

type Props = {
    children?: React.ReactNode;
    onClose?: (result: boolean) => void;
}
export type ModalRef = {
    open: () => void;
}
const Modal = forwardRef<ModalRef, Props>((props, ref) => {
    const [enable, setEnable] = useState(false);

    useImperativeHandle(ref, () => ({
        open: () => setEnable(true),
    }));

    return <ReactModal
        isOpen={enable}
        overlayClassName='modal'
        className='modal-box'
        portalClassName='app'
    >
        <div className='modal-content'>{props.children}</div>
        <div className='modal-footer'>
            <div
                className='modal-button'
                onClick={() => {
                    setEnable(false);
                    props.onClose?.(true);
                }}
            >
                확인
            </div>
            <div
                className='modal-button'
                onClick={() => {
                    setEnable(false);
                    props.onClose?.(false);
                }}
            >
                취소
            </div>
        </div>
    </ReactModal>;
});

export default Modal;