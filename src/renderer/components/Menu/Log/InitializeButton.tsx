import { DispatchChatContext, DispatchMessagesContext } from '@components/contexts';
import { HelpTrigger, Modal, ModalRef } from '@components/util';
import React, { useContext, useRef } from 'react';

const InitializeButton: React.FC = () => {
    const modalRef = useRef<ModalRef>(null);
    const dispatchMessages = useContext(DispatchMessagesContext);
    const dispatchChat = useContext(DispatchChatContext);

    function initializeLog() {
        window.store.saveMessages({ messages: [] });
        window.store.loadMessages().then(({ messages }) => {
            dispatchMessages({ type: 'changeAll', messages });
        });
        dispatchChat({ type: 'initialize' });
    }

    return <>
        <HelpTrigger message='현재 세션의 로그를 초기화합니다. 초기화 후에는 처음부터 다시 대화를 시작하게 됩니다.'>
            <h3
                className='initialize-button'
                onClick={() => modalRef.current?.open()}
            >
                초기화
            </h3>
        </HelpTrigger>
        <Modal
            type='confirm'
            ref={modalRef}
            onClose={(result) => {
                result && initializeLog();
            }}
        >
            <h3>로그 초기화</h3>
            <p>
                로그를 초기화하시겠습니까? <br />
                세션에 저장되지 않은 캐릭터와의 대화내용이 전부 삭제됩니다. <br />
                그로인해 <span className='warning-color'>처음부터 다시 대화를 시작하게 됩니다.</span>
            </p>
        </Modal>
    </>
};

export default InitializeButton;
