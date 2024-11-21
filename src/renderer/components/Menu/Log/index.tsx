import React, { useEffect, useRef } from 'react';
import LogButton from './LogButton';
import LogBox from './LogBox';

type Props = {
    enable?: boolean;
    logButtonEnable?: boolean;
    onLogButtonClick?: () => void;
}
const Log: React.FC<Props> = (props) => {
    const enable = props.enable === undefined ? true : props.enable;
    const scrollRef = useRef<HTMLDivElement>(null);
    const scrollHeight = useRef(-1);

    useEffect(() => {
        if (!scrollHeight.current || !enable) return
        if (scrollHeight.current === -1)
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        else
            scrollRef.current.scrollTop = scrollHeight.current
    }, [enable])

    function handleLogButtonClick() {
        if (enable) {
            scrollHeight.current = scrollRef.current.scrollTop
        }
        props.onLogButtonClick && props.onLogButtonClick();
    }
    return <>
        {enable &&
            <div className='log'>
                <LogBox ref={scrollRef}/>
            </div>}
        {props.logButtonEnable &&
            <LogButton onClick={handleLogButtonClick} />
        }
    </>
}

export default Log;