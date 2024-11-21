import React, { useEffect, useRef } from 'react';

const LogBox: React.FC = () => {
    const logBoxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (logBoxRef.current) {
            logBoxRef.current.scrollTop = logBoxRef.current.scrollHeight;
        }
    }, []);

    return (
        <div className='log-box' ref={logBoxRef}>
            {[...Array(1000)].map((_, i) => (
                <div key={i}>
                    로그 {i}
                </div>
            ))}
        </div>
    )
}

export default LogBox;