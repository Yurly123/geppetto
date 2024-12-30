import { HelpTrigger, Modal, ModalRef } from '@components/util'
import React, { useRef } from 'react'

type Props = {
    name: string,
}
const DeleteButton: React.FC<Props> = ({ name }) => {
    const modalRef = useRef<ModalRef>(null)

    function deleteSession() {
        window.store.deleteSession(name)
    }

    return <>
        <HelpTrigger message='현재 세션을 삭제합니다. 삭제된 세션은 되돌릴 수 없습니다.'>
            <div
                className='warning-color'
                onClick={() => modalRef?.current?.open()}
            >
                삭제하기
            </div>
        </HelpTrigger>
        <Modal
            ref={modalRef}
            type='confirm'
            onClose={(result) => result && deleteSession()}
        >
            <h3 className='warning-color'>정말 세션을 삭제하시겠습니까?</h3>
            <span>삭제된 세션은 되돌릴 수 없습니다</span>
        </Modal>
    </>
}

export default DeleteButton;