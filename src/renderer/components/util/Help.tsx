import React, { useEffect, useRef } from 'react';

type Props = {
    children: React.ReactNode;
    message: string;
}
const Help: React.FC<Props> = ({ children, message }) => {
    const hover = useRef(false);
    const ctrlKey = useRef(false)
    const hKey = useRef(false)
    const x = useRef(0), y = useRef(0);

    function updateShowHelp() {
        const open = hover.current && ctrlKey.current && hKey.current;
        console.log(message, open);
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
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
        >
            {children}
        </div>
    )
}

export default Help;