import React, { useContext } from 'react';
import { HelpContext } from './contexts';

const HelpMessageBox: React.FC = () => {
    const help = useContext(HelpContext);

    return <>{help.open &&
        <div
            className='help-message-box'
            style={{
                top: help.y,
                left: help.x,
                transform: `
                    ${help.x > window.innerWidth / 2 ?
                        'translateX(-100%)' :
                        'translateX(0)'
                    } ${help.y > window.innerHeight / 2 ?
                        'translateY(-100%)' :
                        'translateY(0)'
                    }`,
            }}
        >
            {help.message}
        </div>
    }</>
}

export default HelpMessageBox;