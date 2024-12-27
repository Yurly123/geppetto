import { DispatchChatContext, DispatchMessagesContext } from '@components/contexts'
import { Modal, ModalRef } from '@components/util'
import React, { useContext, useRef } from 'react'

type Props = {
    name: string,
}
const LoadButton: React.FC<Props> = ({ name }) => {
    const dispatchMessages = useContext(DispatchMessagesContext)
    const dispatchChat = useContext(DispatchChatContext)
    const modalRef = useRef<ModalRef>(null)

    async function loadSession() {
        const { messages, userName } = await window.store.loadSession(name)
        dispatchMessages({ type: 'changeAll', messages })
        dispatchChat({ type: 'changePartial', partial: { userName } })
        window.store.setCurrentSession(name)
        window.store.saveMessages({ messages })
    }

    return <>
        <div onClick={() => modalRef?.current?.open()}>
            불러오기
        </div>
        <Modal
            ref={modalRef}
            type='confirm'
            onClose={(result) => result && loadSession()}
        >
            <h3>세션을 불러오시겠습니까?</h3>
            <span>저장되지 않은 현재 대화기록은 <span className='warning-color'>삭제됩니다</span></span>
        </Modal>
    </>
}

export default LoadButton;