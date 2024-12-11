import React, { useEffect, useRef } from 'react';
import LogBox from './LogBox';
import InitializeButton from './InitializeButton';

const Log: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }, [])

    return <div className='log'>
        <LogBox ref={scrollRef} />
        <InitializeButton />
    </div>
}

export default Log;
export { default as LogButton } from './LogButton';