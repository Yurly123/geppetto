import React, { useEffect } from 'react';

type Props = {
    onClick?: () => void;
}
const MenuButton: React.FC<Props> = ({ onClick }) => {
    const [open, setOpen] = React.useState(false);
    const [hover, setHover] = React.useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === 'h' && hover) {
                setOpen(true);
            }
        };
        if (hover) 
            window.addEventListener('keydown', handleKeyDown);
        else window.removeEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [hover]);

    return (
        <div
            className='menu-button'
            onClick={onClick}
            onMouseEnter={() => {
                setHover(true);
            }}
            onMouseLeave={() => {
                setHover(false);
                setOpen(false)
            }}
        >
            <h3>{open && '메뉴'}</h3>
        </div>
    )
}

export default MenuButton;