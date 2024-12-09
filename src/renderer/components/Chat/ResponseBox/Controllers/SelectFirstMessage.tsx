
import { DispatchFirstMessageIndexContext, DispatchMessagesContext } from '@components/contexts';
import React, { useContext } from 'react';

const SelectFirstMessage: React.FC = () => {
    const dispatchFirstMessageIndex = useContext(DispatchFirstMessageIndexContext);
    const dispatchMessages = useContext(DispatchMessagesContext);

    function handlePrevious() {
        dispatchFirstMessageIndex({ type: 'previous' });
        dispatchMessages({ type: 'pop' })
    }
    function handleNext() {
        dispatchFirstMessageIndex({ type: 'next' });
        dispatchMessages({ type: 'pop' })
    }
    return <>
        <div
            className='select-first-message'
            onClick={handlePrevious}
        >
            이전 퍼메
        </div>
        <div
            className='select-first-message'
            onClick={handleNext}
        >
            다음 퍼메
        </div>
    </>
}

export default SelectFirstMessage;