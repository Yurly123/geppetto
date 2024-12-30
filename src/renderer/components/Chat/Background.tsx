import React, { useEffect, useState } from 'react';
import { Background } from '@common/openai';

type Props = {
    background: Background
}
const Backgorund: React.FC<Props> = ({ background }) => {
    const [image, setImage] = useState<string>('');

    useEffect(() => {
        if (!background ||
            !Object.values(Background).includes(background)) {
            setImage('');
            return;
        }
        import(`@assets/images/background/${background}.png`)
            .then((module) => {
                setImage(module.default);
            })
            .catch(() => {})
    }, [background])

    return (
        <div className='background'>
            <img src={image} />
        </div>
    );
}

export default Backgorund;