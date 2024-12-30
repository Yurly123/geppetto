import { MessagesContext } from '@components/contexts'
import { HelpTrigger, Modal, ModalRef } from '@components/util'
import React, { useContext, useRef } from 'react'

type Props = {
    name: string,
}
const OverwriteButton: React.FC<Props> = ({ name }) => {
    const messages = useContext(MessagesContext)
    const modalRef = useRef<ModalRef>(null)

    function saveSession() {
        window.store.saveSession(name, { messages })
        window.store.setCurrentSession(name)
    }

    return <>
        <HelpTrigger message='세션의 저장내용을 덮어씁니다. 평소에는 현재 세션에 자동으로 저장이 됩니다.'>
            <div onClick={() => modalRef?.current?.open()}>
                덮어쓰기
            </div>
        </HelpTrigger>
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