import { DispatchMessagesContext } from "@components/contexts";
import { HelpTrigger } from "@components/util";
import React, { useContext } from "react";

const Reroll: React.FC = () => {
    const dispatchMessages = useContext(DispatchMessagesContext)

    function handleClick() {
        dispatchMessages({ type: 'pop' });
    }
    return (
        <div
            className='reroll'
            onClick={handleClick}
        >
            <HelpTrigger message='이전 요청과 똑같은 조건으로 새로운 응답을 요청합니다. 현재의 응답은 저장되지 않고 새로운 응답으로 대체됩니다.'>
                다시 생성
            </HelpTrigger>
        </div>
    );
}

export default Reroll;