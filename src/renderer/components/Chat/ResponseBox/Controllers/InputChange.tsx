import { HelpTrigger } from "@components/util";
import React from "react";

const InputChange: React.FC = () => {

    function handleClick() {
    }
    return (
        <div
            className='input-change'
            onClick={handleClick}
        >
            <HelpTrigger message='입력한 내용을 바꿀 수 있습니다. 현재의 응답은 저장되지 않고 새로운 응답으로 대체됩니다.'>
                입력 바꾸기
            </HelpTrigger>
        </div>
    );
}

export default InputChange;