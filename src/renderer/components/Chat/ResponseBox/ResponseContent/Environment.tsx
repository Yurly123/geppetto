import React from 'react';

type Props = {
    time: string;
    location: string;
}
const Environment: React.FC<Props> = ({ time, location }) => {
    return <div className='response-element'>
        <p> 
            {location}, {time}
        </p>
    </div>;
}

export default Environment;