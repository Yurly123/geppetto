import React, { useEffect, useReducer } from 'react';
import SubtitleBox from './SubtitleBox';

const Subtitle: React.FC = () => {
    const [subtitle, dispatchSubtitle] = useReducer(subtitleReducer, '');
    let disappearDelay = 10 + subtitle.length / 10;

    useEffect(() => {
        window.openai.onCompletionStart(() => {
            dispatchSubtitle({ type: 'clear' });
        });
        window.openai.onCompletionChunk((chunk) => {
            dispatchSubtitle({ type: 'data', data: chunk })
        });
        return () => {
            window.openai.removeCompletionStartListeners();
            window.openai.removeCompletionChunkListeners();
        }
    }, []);

    useEffect(() => {
        disappearDelay = 10 + subtitle.length / 10;
    }, [subtitle]);

    return (
        <div className='chat-subtitle'>
            <SubtitleBox message={subtitle} disappearDelay={disappearDelay} />
        </div>
    )
};

export default Subtitle;

function subtitleReducer(
    state: string,
    action: { type: 'clear' | 'data', data?: string }
) {
    action.data = action.data || '';
    switch (action.type) {
        case 'clear':
            return action.data;
        case 'data':
            return state + action.data;
    }
}