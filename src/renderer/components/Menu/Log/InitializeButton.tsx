import { systemMessage } from '@common/openai';
import { DispatchMessagesContext } from '@components/contexts';
import { Modal } from '@components/util';
import React, { useContext, useState } from 'react';

const InitializeButton: React.FC = () => {
    const [modalEnable, setModalEnable] = useState(false);
    const dispatchMessages = useContext(DispatchMessagesContext);

    function initializeLog() {
        window.store.saveMessages([systemMessage()]);
        window.store.loadMessages().then((messages) => {
            dispatchMessages({ type: 'changeAll', messages });
        });
    }

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
            onClose={(result) => {
                result && initializeLog();
            }}
        >
            <h3>로그 초기화</h3>
            <p style={{ margin: '0', fontSize: '1.75rem' }}>
                로그를 초기화하시겠습니까? <br />
                캐릭터와의 대화내용이 전부 삭제됩니다. <br />
                그로인해 <span className='warning-color'>처음부터 다시 대화를 시작하게 됩니다.</span>
            </p>
        </Modal>
    </>
};

export default InitializeButton;
