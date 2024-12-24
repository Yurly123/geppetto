import React, { useEffect, useReducer } from 'react';
import SessionElement from './SessionElement';
import NewSession from './NewSession';

interface Session {
    name: string;
    displayContent: string;
    isCurrent: boolean;
}

const SessionBox: React.FC = () => {
    const [sessions, dispatchSession] = useReducer(sessionReducer, [])

    async function loadSessions() {
        dispatchSession({ type: 'clear' })
        const fileNames = await window.store.getAllSessions()
        const sessionNames = fileNames.map(fileName => fileName.split('.json')[0])
        let currentSession = await window.store.getCurrentSession()
        if (!currentSession || !sessionNames.includes(currentSession)) {
            if (currentSession !== '') {
                currentSession = ''
                window.store.setCurrentSession(currentSession)
                return
            }
        }
        sessionNames.forEach(async sessionName => {
            const { messages } = await window.store.loadSession(sessionName)
            const displayContent = messages?.at(-1)?.content || ''
            console.log(displayContent)
            dispatchSession({
                type: 'add', session: {
                    name: sessionName,
                    displayContent,
                    isCurrent: sessionName === currentSession
                }
            })
        })
    }

    useEffect(() => {
        loadSessions()
        window.store.onSessionsChanged(loadSessions)
        return () => window.store.removeSessionsChangedListeners()
    }, [])

    return (
        <div className='session-box'><div>
            {sessions.map(session => (
                <SessionElement
                    key={session.name}
                    name={session.name}
                    displayContent={session.displayContent}
                    isCurrent={session.isCurrent}
                />
            ))}
            <NewSession />
        </div></div>
    )
}

export default SessionBox;

function sessionReducer(
    state: Session[],
    action: {
        type: 'add' | 'clear'
        session?: Session
    }
): Session[] {
    switch (action.type) {
        case 'add':
            return [...state, action.session]
        case 'clear':
            return []
        default:
            return state
    }
}