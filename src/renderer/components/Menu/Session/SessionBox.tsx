import React, { useEffect, useReducer } from 'react';
import SessionElement from './SessionElement';

interface Session {
    name: string;
    displayContent: string;
    isCurrent: boolean;
}

const SessionBox: React.FC = () => {
    const [sessions, dispatchSession] = useReducer(sessionReducer, [])

    useEffect(() => { (async () => {
        const fileNames = await window.store.getAllSessions()
        const sessionNames = fileNames.map(fileName => fileName.split('.json')[0])
        let currentSession = await window.store.getCurrentSession()
        if (!currentSession || !sessionNames.includes(currentSession)) {
            currentSession = ''
            window.store.setCurrentSession(currentSession)
        }
        sessionNames.forEach(async sessionName => {
            const messages = await window.store.loadSession(sessionName)
            const displayContent = messages?.at(-1).content
            dispatchSession({
                name: sessionName,
                displayContent,
                isCurrent: sessionName === currentSession
            })
        })
    })() }, [])

    return (
        <div className='session-box'>
            {sessions.map(session => (
                <SessionElement
                    key={session.name}
                    name={session.name}
                    displayContent={session.displayContent}
                    isCurrent={session.isCurrent}
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