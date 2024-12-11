import React from 'react'

type Props = {
    name: string,
}
const DeleteButton: React.FC<Props> = ({ name }) => {
    async function handleClick() {
        console.log(name, ' 구현 안?됨')
    }

    return (
        <div className='warning-color' onClick={handleClick}>
            삭제하기
        </div>
    )
}

export default DeleteButton;