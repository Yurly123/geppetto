import { MessagesContext } from '@components/contexts'
import { Modal, ModalRef } from '@components/util'
import React, { useContext, useRef } from 'react'

type Props = {
    name: string,
}
const OverwriteButton: React.FC<Props> = ({ name }) => {
    const messages = useContext(MessagesContext)
    const modalRef = useRef<ModalRef>(null)

    function saveSession() {
        window.store.saveSession(name, messages)
        window.store.setCurrentSession(name)
    }

    return <>
        <div onClick={() => modalRef?.current?.open()}>
            덮어쓰기
        </div>
        <Modal
            ref={modalRef}
            type='confirm'
            onClose={() => saveSession()}
        >
            <h3>이미 존재하는 세션을 덮어쓰시겠습니까?</h3>
            <span>원래 세션의 대화기록은 현재 대화기록으로 <span className='warning-color'>대체됩니다</span></span>
        </Modal>
    </>
}

export default OverwriteButton;