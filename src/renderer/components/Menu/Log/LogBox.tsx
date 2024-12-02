import { MessagesContext } from '@components/contexts';
import React, { forwardRef, useContext } from 'react';
import LogElement from './LogElement';

const LogBox = forwardRef<HTMLDivElement>((_, scrollRef) => {
    const messages = useContext(MessagesContext)

    return (
        <div className='log-box' ref={scrollRef}>
            <div>
                {messages.map((message, index) =>
                    <LogElement
                        key={index}
                        message={message}
                        index={index}
                    />
                )}
            </div>
        </div>
    )
})

export default LogBox;