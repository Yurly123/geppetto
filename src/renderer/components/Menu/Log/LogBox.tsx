import React, { forwardRef } from 'react';

const LogBox = forwardRef<HTMLDivElement>((_, scrollRef) => {
    return (
        <div className='log-box' ref={scrollRef}>
            {[...Array(1000)].map((_, i) => (
                <div key={i}>
                    로그 {i}
                </div>
            ))}
        </div>
    )
})

export default LogBox;