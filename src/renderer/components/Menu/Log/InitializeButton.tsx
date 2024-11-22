import { Modal } from '@components/util';
import React from 'react';

const InitializeButton: React.FC = () => {
    return (
        <>
            <h3 className='initialize-button'>
                초기화
            </h3>
            <Modal />
        </>
    );
};

export default InitializeButton;
