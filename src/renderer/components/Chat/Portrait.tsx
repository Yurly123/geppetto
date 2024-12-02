import React from 'react';
import portrait from '@assets/images/gepptto/neutral.png'

const Portrait: React.FC = () => {
    return (
        <div className='portrait'>
            <img src={portrait} alt='portrait' />
        </div>
    );
}

export default Portrait;