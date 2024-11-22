import { Modal } from '@components/util';
import React, { useState } from 'react';

const InitializeButton: React.FC = () => {
    const [modalEnable, setModalEnable] = useState(false);

    return <>
        <h3
            className='initialize-button'
            onClick={() => setModalEnable(true)}
        >
            초기화
        </h3>
        <Modal
            enable={modalEnable}
            setEnable={setModalEnable}
        >
            <h1>모달</h1>
        </Modal>
    </>
};

export default InitializeButton;
