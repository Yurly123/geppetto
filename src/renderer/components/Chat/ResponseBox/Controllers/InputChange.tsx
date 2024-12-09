import { HelpTrigger, Modal, ModalRef } from "@components/util";
import React, { useRef } from "react";

const InputChange: React.FC = () => {
    const modalRef = useRef<ModalRef>(null);

    function handleClick() {
        modalRef.current?.open();
    }
    return <>
        <div
            className='input-change'
            onClick={handleClick}
        >
            <HelpTrigger message='사용자가 현재 응답에서 입력했던 내용을 바꿀 수 있습니다. 현재의 응답은 저장되지 않고 새로운 응답으로 대체됩니다.'>
                입력 바꾸기
            </HelpTrigger>
        </div>
        <Modal
            type='prompt'
            ref={modalRef}
            onClose={(result) => {
                console.log(result);
            }}
        >
            <h3>입력 바꾸기</h3>
            <span>
                새로운 입력을 입력해주세요.
            </span>
        </Modal>
    </>
}

export default InputChange;