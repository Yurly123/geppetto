import { DispatchMessagesContext } from '@components/contexts'
import React, { useContext } from 'react'

type Props = {
    name: string,
}
const LoadButton: React.FC<Props> = ({ name }) => {
    const dispatchMessages = useContext(DispatchMessagesContext)

    async function handleClick() {
        const messages = await window.store.loadSession(name)
        dispatchMessages({ type: 'changeAll', messages: messages })
        window.store.setCurrentSession(name)
    }

    return (
        <div onClick={handleClick}>
            불러오기
        </div>
    )
}

export default LoadButton;