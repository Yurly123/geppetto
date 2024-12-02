import { Character, Paragraph } from '@common/openai';
import React, { createElement, ReactElement } from 'react';

type Props = {
    paragraph: Paragraph;
}
const Paragraph: React.FC<Props> = ({ paragraph }) => {
    let speaker: ReactElement;
    switch (paragraph.dialogue.speaker) {
        case Character.Geppetto:
            speaker = createElement('span',
                { style: { color: 'coral' } },
                '제페토');
            break;
    }

    return <div className='response-element'>
        <p>
            {paragraph.narrative}
            <br />
            {speaker}:
            <span className='dialogue'>
                "{paragraph.dialogue.content}"
            </span>
        </p>
    </div>;
}

export default Paragraph;