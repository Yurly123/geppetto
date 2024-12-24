import { ChatContext, DispatchMessagesContext, MessagesContext } from "@components/contexts";
import { HelpTrigger, Modal, ModalRef } from "@components/util";
import React, { useContext, useRef } from "react";

const DeleteMessage: React.FC = () => {
    const messages = useContext(MessagesContext)
    const dispatchMessages = useContext(DispatchMessagesContext)
    const { userInput } = useContext(ChatContext)
    const modalRef = useRef<ModalRef>(null);

    function deleteMessage() {
        const index = messages.findIndex(
            (message) => message === userInput)
        dispatchMessages({
            type: 'changeAll',
            messages: messages.slice(0, index),
        })
        window.store.saveMessages({ messages: [] })
    }
    return <>
        <div
            className='delete-message'
            onClick={() => modalRef.current?.open()}
        >
            <HelpTrigger message='현재 응답부터 그 이후의 대화 내역을 전부 삭제합니다. 삭제된 메세지는 되돌릴 수 없습니다.'>
                메세지 삭제
            </HelpTrigger>
        </div>
        <Modal
            type='confirm'
            ref={modalRef}
            onClose={(result) => result && deleteMessage()}
        >
            <h3 className='warning-color'>메세지 삭제</h3>
            <p>
                현재 표시된 응답부터 <span className='warning-color'>그 이후의 대화 내역</span>을 <span className='warning-color'>전부 삭제</span>합니다. <br />
                삭제된 메세지는 <span className='warning-color'>되돌릴 수 없습니다.</span> <br />
                그래도 삭제하시겠습니까?
            </p>
        </Modal>
    </>
}

export default DeleteMessage;