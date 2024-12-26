import React from 'react';
import UserInput from './UserInput';
import Paragraph from './Paragraph';
import { Response, UserMessage } from '@common/openai';
import Environment from './Environment';

type Props = {
    userInput: UserMessage;
    response: Response;
    userName: string;
}
const ResponseContent: React.FC<Props> = ({ userInput, response, userName }) => {
    return <div className='response-content'>
        {userInput && userInput.content &&
            <UserInput userInput={userInput} />
        }
        {response?.time && response?.location &&
            <Environment
                time={response.time}
                location={response.location} />
        }
        {response?.paragraphs.map((paragraph, index) => (
            paragraph && paragraph.narrative &&
            <Paragraph
                key={index}
                paragraph={paragraph}
                index={index}
                userName={userName}
            />
        ))}
    </div>
}

export default ResponseContent;