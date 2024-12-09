import { createMessage } from "@common/openai";
import { DispatchMessagesContext, MessagesContext } from "@components/contexts";
import { HelpTrigger, Modal, ModalRef } from "@components/util";
import React, { useContext, useRef } from "react";

const InputChange: React.FC = () => {
    const messages = useContext(MessagesContext)
    const dispatchMessages = useContext(DispatchMessagesContext)
    const modalRef = useRef<ModalRef>(null);

    const userMessage = messages.at(-2);
    if (!userMessage || userMessage.role !== 'user') 
        return null;

    function handlePrompt(result: string) {
        if (!result) return;
        dispatchMessages({
            type: 'changeIndex',
            index: -2,
            message: createMessage('user', result),
        });
    }
    return <>
        <div
            className='input-change'
            onClick={() => modalRef.current?.open()}
        >
            <HelpTrigger message='사용자가 현재 응답에서 입력했던 내용을 바꿀 수 있습니다. 현재의 응답은 저장되지 않고 새로운 응답으로 대체됩니다. 입력을 바꿔도 응답을 새로 요청하지는 않습니다.'>
                입력 바꾸기
            </HelpTrigger>
        </div>
        <Modal
            type='prompt'
            ref={modalRef}
            onClose={handlePrompt}
            defaultValue={userMessage.content}
        >
            <h3>입력 바꾸기</h3>
            <span>
                새로운 입력을 입력해주세요.
            </span>
        </Modal>
    </>
}

export default InputChange;