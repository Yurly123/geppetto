import React from 'react'

type Props = {
    name: string,
}
const DeleteButton: React.FC<Props> = ({ name }) => {
    async function handleClick() {
        window.store.deleteSession(name)
    }

    return (
        <div className='warning-color' onClick={handleClick}>
            삭제하기
        </div>
    )
}

export default DeleteButton;