import { Character, CharacterWithUser, Paragraph } from '@common/openai';
import { DispatchChatContext } from '@components/contexts';
import React, { createElement, ReactElement, useContext } from 'react';

type Props = {
    paragraph: Paragraph;
    userName: string;
    index: number;
}
const Paragraph: React.FC<Props> = ({ paragraph, index, userName }) => {
    const dispatchChat = useContext(DispatchChatContext);

    let speaker: ReactElement;
    switch (paragraph.dialogue?.speaker) {
        case Character.Geppetto:
            speaker = createElement('span',
                { style: { color: 'coral' } },
                '제페토');
            break;
        case Character.Gemini:
            speaker = createElement('span',
                { style: { color: 'gold' } },
                '제미니');
            break;
        case Character.Claude:
            speaker = createElement('span',
                { style: { color: 'chocolate' } },
                '클로드');
            break;
        case CharacterWithUser.User:
            speaker = createElement('span',
                { style: { color: 'dodgerblue' } },
                userName);
            break;
        default:
            speaker = null
            break;
    }

    return <div
        className='response-element'
        onMouseEnter={() => {
            dispatchChat({ type: 'changeIndex', index });
        }}
    >
        <p>
            {paragraph.narrative}
            <br />
            {speaker}:
            <span className='dialogue'>
                "{paragraph.dialogue?.content}"
            </span>
        </p>
    </div>;
}

export default Paragraph;