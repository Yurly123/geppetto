import React from 'react';
import ReactModal from 'react-modal';

const Modal: React.FC = () => {
    return <ReactModal
        isOpen={true}
        overlayClassName='modal'
        className='modal-box'
        portalClassName='app'
    >
        모달
    </ReactModal>;
};

export default Modal;