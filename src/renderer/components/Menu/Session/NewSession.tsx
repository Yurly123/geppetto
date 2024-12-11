
import { Modal, ModalRef } from '@components/util';
import React, { useRef } from 'react'

const NewSession: React.FC = () => {
    const modalRef = useRef<ModalRef>(null)

    function createNewSession(sessionName: string) {
        window.store.createSession(sessionName)
    }
    return <>
        <div
            className='new-session'
            onClick={() => modalRef.current?.open()}
        >
            새 세션 생성
        </div>
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