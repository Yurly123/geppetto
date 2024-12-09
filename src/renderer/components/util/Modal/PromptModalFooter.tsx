import React, { useRef } from 'react';

type Props = {
    close: () => void;
    onClose?: (result: string) => void;
    defaultValue?: string;
}
const PromptModalFooter: React.FC<Props> = ({ close, onClose, defaultValue }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    return <>
        <input
            className='modal-input'
            type='text'
            defaultValue={defaultValue}
            ref={inputRef}
        />
        <div
            className='modal-button'
            onClick={() => {
                close();
                onClose?.(inputRef.current?.value ?? defaultValue ?? '');
            }}
        >
            확인
        </div>
        <div
            className='modal-button'
            onClick={close}
        >
            취소
        </div>
    </>
}

export default PromptModalFooter;