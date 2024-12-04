import { Character, Paragraph } from '@common/openai';
import { DispatchChatContext } from '@components/contexts';
import React, { createElement, ReactElement, useContext } from 'react';

type Props = {
    paragraph: Paragraph;
    index: number;
}
const Paragraph: React.FC<Props> = ({ paragraph, index }) => {
    const dispatchChat = useContext(DispatchChatContext);

    let speaker: ReactElement;
    console.log(paragraph.dialogue?.speaker);
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
        default:
            speaker = null
            break;
    }
    console.log(speaker);

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