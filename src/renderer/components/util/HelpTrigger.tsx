import { DispatchHelpContext } from '@components/contexts';
import React, { useContext, useEffect, useRef } from 'react';

type Props = {
    children: React.ReactNode;
    message: string;
}
const HelpTrigger: React.FC<Props> = ({ children, message }) => {
    const dispatchHelp = useContext(DispatchHelpContext);
    const hover = useRef(false);
    const ctrlKey = useRef(false)
    const hKey = useRef(false)
    const x = useRef(0), y = useRef(0);

    function updateShowHelp() {
        const open = hover.current && ctrlKey.current && hKey.current;
        dispatchHelp({ message, open, x: x.current, y: y.current });
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.repeat) return;
            if (e.key === 'Control') ctrlKey.current = true;
            if (e.key === 'h') hKey.current = true;

            updateShowHelp();
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key === 'Control') ctrlKey.current = false;
            if (e.key === 'h') hKey.current = false;
            updateShowHelp()
        }

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [])

    return (
        <div
            onMouseEnter={() => {
                hover.current = true
                updateShowHelp()
            }}
            onMouseLeave={() => {
                hover.current = false
                updateShowHelp()
            }}
            onMouseMove={(e) => {
                x.current = e.clientX;
                y.current = e.clientY;
                hover.current = true;
                updateShowHelp()
            }}
            className='help-trigger'
        >
            {children}
        </div>
    )
}

export default HelpTrigger;