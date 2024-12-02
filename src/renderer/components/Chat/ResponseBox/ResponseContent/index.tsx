import React from 'react';
import UserInput from './UserInput';
import Paragraph from './Paragraph';
import { Response, UserMessage } from '@common/openai';
import Environment from './Environment';

type Props = {
    userInput: UserMessage;
    response: Response;
}
const ResponseContent: React.FC<Props> = ({ userInput, response }) => {
    return <div className='response-content'>
        <UserInput userInput={userInput} />
        <Environment time={response?.time} location={response?.location} />
        {response?.paragraphs.map((paragraph, index) => (
            <Paragraph key={index} paragraph={paragraph} index={index} />
        ))}
    </div>
}

export default ResponseContent;