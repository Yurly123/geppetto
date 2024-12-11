import { MessagesContext } from '@components/contexts'
import React, { useContext } from 'react'

type Props = {
    name: string,
}
const OverwriteButton: React.FC<Props> = ({ name }) => {
    const messages = useContext(MessagesContext)

    async function handleClick() {
        await window.store.saveSession(name, messages)
    }

    return (
        <div onClick={handleClick}>
            덮어쓰기
        </div>
    )
}

export default OverwriteButton;