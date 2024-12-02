import React from 'react';
import ChatBar from './ChatBar';
import ResponseContent from './ResponseContent';

const ResponseBox: React.FC = () => {
    return (
        <div className='response-box'>
            <ResponseContent />
            <ChatBar enable={true} />
        </div>
    );
}

export default ResponseBox;