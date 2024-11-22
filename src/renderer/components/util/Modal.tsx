import React from 'react';
import ReactModal from 'react-modal';

type Props = {
    children?: React.ReactNode;
    enable: boolean;
    setEnable: (enable: boolean) => void;
    onClose?: (result: boolean) => void;
}
const Modal: React.FC<Props> = (props) => {
    return <ReactModal
        isOpen={props.enable}
        overlayClassName='modal'
        className='modal-box'
        portalClassName='app'
    >
        <div className='modal-content'>{props.children}</div>
        <div className='modal-footer'>
            <div
                className='modal-button'
                onClick={() => {
                    props.setEnable(false);
                    props.onClose?.(true);
                }}
            >
                확인
            </div>
            <div
                className='modal-button'
                onClick={() => {
                    props.setEnable(false);
                    props.onClose?.(false);
                }}
            >
                취소
            </div>
        </div>
    </ReactModal>;
};

export default Modal;