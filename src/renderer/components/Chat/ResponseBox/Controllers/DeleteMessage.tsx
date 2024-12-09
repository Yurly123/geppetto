import { HelpTrigger } from "@components/util";
import React from "react";

const DeleteMessage: React.FC = () => {

    function handleClick() {
    }
    return (
        <div
            className='delete-message'
            onClick={handleClick}
        >
            <HelpTrigger message='이 응답부터 그 이후의 대화 내역을 전부 삭제합니다. 삭제된 메세지는 되돌릴 수 없습니다. 삭제된 후에는 곧바로 현재 입력을 기반으로 응답을 다시 생성합니다.'>
                메세지 삭제
            </HelpTrigger>
        </div>
    );
}

export default DeleteMessage;