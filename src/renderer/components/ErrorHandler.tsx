import React, { useContext, useEffect, useRef, useState } from 'react';
import { Modal, ModalRef } from './util';
import { DispatchMessagesContext, MessagesContext } from './contexts';

const ErrorHandler: React.FC = () => {
    const modalRef = useRef<ModalRef>(null);
    const [error, setError] = useState('');
    const messages = useContext(MessagesContext);
    const dispatchMessages = useContext(DispatchMessagesContext);

    useEffect(() => {
        window.openai.onCompletionError((error) => {
            setError(error);
            modalRef.current?.open();
            if (messages.at(-1)?.role === 'user')
                dispatchMessages({ type: 'pop' });
        })
        return () => {
            window.openai.removeCompletionErrorListeners()
        }
    }, [messages])

    return <Modal type='alert' ref={modalRef}>
        <span color='red'>{error}</span>
    </Modal>
}

export default ErrorHandler;