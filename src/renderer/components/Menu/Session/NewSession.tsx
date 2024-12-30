
import { HelpTrigger, Modal, ModalRef } from '@components/util';
import React, { useRef } from 'react'

const NewSession: React.FC = () => {
    const modalRef = useRef<ModalRef>(null)

    function createNewSession(sessionName: string) {
        window.store.createSession(sessionName)
    }
    return <>
        <HelpTrigger message='새로운 세션을 생성합니다. 생성된 세션은 아무런 대화내용이 없으며, 여기에 대화를 저장하거나 새로운 대화를 시작할 수 있습니다.'>
            <div
                className='new-session'
                onClick={() => modalRef.current?.open()}
            >
                새 세션 생성
            </div>
        </HelpTrigger>
        <Modal
            ref={modalRef}
            type='prompt'
            onClose={createNewSession}
        >
            <h3>세션 이름</h3>
        </Modal>
    </>
}

export default NewSession;