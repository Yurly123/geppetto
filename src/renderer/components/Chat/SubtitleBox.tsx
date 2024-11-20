import React, { CSSProperties, useState, useEffect } from 'react';

type Props = {
    message?: string;
    disappearDuration?: number;
    appearDuration?: number;
    disappearDelay?: number;
}

function addDefaultProps(props: Props) {
    return {
        message: '',
        appearDuration: 0.25,
        disappearDuration: 3,
        disappearDelay: 10,
        ...props,
    }
}

const SubtitleBox: React.FC<Props> = (props) => {
    props = addDefaultProps(props);

    const [style, setStyle] = useState<CSSProperties>({});

    const appear: CSSProperties = {
        animationName: 'appear',
        animationDuration: `${props.appearDuration}s`,
        opacity: 1,
    }
    const disappear: CSSProperties = {
        animationName: 'disappear',
        animationDuration: `${props.disappearDuration}s`,
        opacity: 0,
    }

    useEffect(() => {
        if (!props.message) return;
        setStyle(appear);

        const timer = setTimeout(
            () => setStyle(disappear),
            props.disappearDelay * 1000
        );
        return () => clearTimeout(timer);
    }, [props.message]);

    return props.message ? (
        <div className='chat-subtitle-box' style={style}>
            <span>
                {props.message}
            </span>
        </div>
    ) : null;
};

export default SubtitleBox;
