import { DispatchMessagesContext } from '@components/contexts';
import React, { useContext } from 'react';

type Props = {
    name: string;
    displayContent: string;
}
const SessionElement: React.FC<Props> = ({ name, displayContent }) => {
    const dispatchMessages = useContext(DispatchMessagesContext)

    async function handleClick() {
        const messages = await window.store.loadSession(name)
        console.log(messages)
        dispatchMessages({ type: 'changeAll', messages: messages })
    }

    return (
        <div
            className='session-element'
            onClick={handleClick}
        >
            <header>
                <h2>{name}</h2>
            </header>
            <p>{displayContent}</p>
        </div>
    )
}

export default SessionElement;