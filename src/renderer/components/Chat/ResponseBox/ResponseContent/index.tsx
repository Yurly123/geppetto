import { MessagesContext } from '@components/contexts';
import React, { useContext } from 'react';
import UserInput from './UserInput';
import { textToResponse } from '@common/openai';
import Paragraph from './Paragraph';

const ResponseContent: React.FC = () => {
    const messages = useContext(MessagesContext)
    const userInput = messages.at(-2)
    const assistantResponse = messages.at(-1)
    if (!userInput || !assistantResponse
        || userInput.role !== 'user'
        || assistantResponse.role !== 'assistant')
        return <div className='response-content' />
    const response = textToResponse(assistantResponse.content)

    return <div className='response-content'>
        <UserInput userInput={userInput} />
        {response.paragraphs.map((paragraph, index) => (
            <Paragraph key={index} paragraph={paragraph} />
        ))}
    </div>
}

export default ResponseContent;