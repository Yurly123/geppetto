import React, { forwardRef, useImperativeHandle, useState } from 'react';
import ReactModal from 'react-modal';
import ConfirmModalFooter from './ConfirmModalFooter';
import AlertModalFooter from './AlertModalFooter';
import PromptModalFooter from './PromptModalFooter';

type ConfirmProps = {
    type: 'confirm';
    onClose?: (result: boolean) => void;
    children?: React.ReactNode;
}
type AlertProps = {
    type: 'alert';
    onClose?: () => void;
    children?: React.ReactNode;
}
type PromptProps = {
    type: 'prompt';
    onClose?: (result: string) => void;
    defaultValue?: string;
    children?: React.ReactNode;
}
type Props = ConfirmProps | AlertProps | PromptProps;
export type ModalRef = {
    open: () => void;
}
const Modal = forwardRef<ModalRef, Props>((props, ref) => {
    const [enable, setEnable] = useState(false);

    const close = () => setEnable(false);

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
            {props.type === 'confirm' &&
                <ConfirmModalFooter
                    close={close}
                    onClose={props.onClose}
                />}
            {props.type === 'alert' &&
                <AlertModalFooter
                    close={close}
                    onClose={props.onClose}
                />}
            {props.type === 'prompt' &&
                <PromptModalFooter
                    close={close}
                    onClose={props.onClose}
                    defaultValue={props.defaultValue}
                />}
        </div>
    </ReactModal>;
});

export default Modal;