import React, { useEffect, useRef, useState } from 'react';
import LogButton from './LogButton';
import LogBox from './LogBox';
import InitializeButton from './InitializeButton';

type Props = {
    logButtonEnable?: boolean;
}
const Log: React.FC<Props> = (props) => {
    const [enable, setEnable] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const scrollHeight = useRef(-1);

    useEffect(() => {
        if (!enable || !scrollRef.current) return
        if (scrollHeight.current === -1)
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        else
            scrollRef.current.scrollTop = scrollHeight.current
    }, [enable])

    function handleLogButtonClick() {
        if (enable) 
            scrollHeight.current = scrollRef.current.scrollTop
        setEnable(!enable)
    }
    return <>
        {enable &&
            <div className='log'>
                <LogBox ref={scrollRef}/>
                <InitializeButton />
            </div>}
        {props.logButtonEnable &&
            <LogButton onClick={handleLogButtonClick} />
        }
    </>
}

export default Log;