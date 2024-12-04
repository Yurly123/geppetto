import React, { useEffect, useState } from 'react';
import { Character, Emotion } from '@common/openai';

type Props = {
    character: Character;
    emotion: Emotion;
}
const Portrait: React.FC<Props> = ({ character, emotion }) => {
    const [portrait, setPortrait] = useState<string>('');

    useEffect(() => {
        if (!character || !emotion ||
            !Object.values(Character).includes(character) ||
            !Object.values(Emotion).includes(emotion)
        ) return;
        import(`@assets/images/${character}/${emotion}.png`)
            .then((module) => {
                setPortrait(module.default);
            })
            .catch(() => {})
    }, [character, emotion])

    return (
        <div className='portrait'>
            <img src={portrait} alt='portrait' />
        </div>
    );
}

export default Portrait;