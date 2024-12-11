import React, { useEffect, useReducer } from 'react';
import SessionElement from './SessionElement';

interface Session {
    name: string;
    displayContent: string;
}

const SessionBox: React.FC = () => {
    const [sessions, dispatchSession] = useReducer(sessionReducer, [])

    useEffect(() => {
        window.store.getAllSessions()
            .then(fileNames => fileNames.forEach(loadSession))

        async function loadSession(fileName: string) {
            const sessionName = fileName.split('.')[0]
            const messages = await window.store.loadSession(sessionName)
            const displayContent = messages?.at(-1).content
            dispatchSession({ name: fileName, displayContent })
        }
    }, [])

    return (
        <div className='session-box'>
            {sessions.map(session => (
                <SessionElement
                    key={session.name}
                    name={session.name}
                    displayContent={session.displayContent}
                />
            ))}
        </div>
    )
}

export default SessionBox;

function sessionReducer(
    state: Session[],
    action: Session
): Session[] {
    return [...state, action]
}