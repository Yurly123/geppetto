import { Messages } from "@common/openai";
import { DispatchChatContext } from "@components/contexts";
import { HelpTrigger, Modal, ModalRef } from "@components/util";
import React, { useContext, useRef } from "react";

const UserNameInput: React.FC = () => {
    const dispatchChat = useContext(DispatchChatContext)
    const modalRef = useRef<ModalRef>(null);

    function handleName(result: string) {
        if (!result) return;
        dispatchChat({ 
            type: 'changePartial',
            partial: { userName: result },
        })
        const saveData: Messages = {
            userName: result,
            messages: []
        }
        window.store.saveMessages(saveData)
        window.store.getCurrentSession().then(currentSession =>
            window.store.saveSession(currentSession, saveData)
        )
    }
    return <>
        <div
            className='user-name-input'
            onClick={() => modalRef.current?.open()}
        >
            <HelpTrigger message='사용자의 이름을 변경할 수 있습니다. 이름은 {{user}}에서 입력한 이름으로 대체됩니다.'>
                이름 변경
            </HelpTrigger>
        </div>
        <Modal
            type='prompt'
            ref={modalRef}
            onClose={handleName}
        >
            <h3>사용자 이름 변경</h3>
            <span>
                사용자 이름을 입력해주세요.
            </span>
        </Modal>
    </>
}

export default UserNameInput;