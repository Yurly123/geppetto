import React from 'react';
import UserInput from './UserInput';
import Paragraph from './Paragraph';
import { Response, UserMessage } from '@common/openai';

type Props = {
    userInput: UserMessage;
    response: Response;
}
const ResponseContent: React.FC<Props> = ({ userInput, response }) => {
    return <div className='response-content'>
        <UserInput userInput={userInput} />
        {response?.paragraphs.map((paragraph, index) => (
            <Paragraph key={index} paragraph={paragraph} index={index} />
        ))}
    </div>
}

export default ResponseContent;