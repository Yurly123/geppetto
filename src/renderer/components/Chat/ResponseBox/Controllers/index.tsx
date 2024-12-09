import React from 'react';
import RerollButton from './RerollButton';

type Props = {
    isCurrentChat?: boolean;
}
const Controllers: React.FC<Props> = ({isCurrentChat}) => {
    return (
        <div className='controllers'>
            {isCurrentChat &&
                <RerollButton />}
            <div>asdf</div>
        </div>
    );
}

export default Controllers;