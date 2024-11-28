import React, { useEffect, useReducer } from 'react';
import SubtitleBox from './SubtitleBox';
import { RESPONSE_START } from '@common/openai';

interface SubtitleState {
    buffer: string;
    content: string;
    responseStarted: boolean;
}
const initialState: SubtitleState = { 
    buffer: '', content: '', responseStarted: false,
}

const Subtitle: React.FC = () => {
    const [subtitle, dispatchSubtitle] = useReducer(subtitleReducer, initialState);
    let disappearDelay = 10 + subtitle.content.length / 10;

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
        disappearDelay = 10 + subtitle.content.length / 10;
    }, [subtitle.content]);

    return (
        <div className='subtitle'>
            <SubtitleBox
                message={subtitle.content}
                disappearDelay={disappearDelay}
            />
        </div>
    )
};

export default Subtitle;

function subtitleReducer(
    state: SubtitleState,
    action: { type: 'clear' | 'data', data?: string }
): SubtitleState {
    action.data = action.data || '';
    switch (action.type) {
        case 'clear':
            return initialState;
        case 'data': {
            const newState = { ...state }

            if (state.buffer.includes(RESPONSE_START))
                newState.responseStarted = true;
            else newState.responseStarted = false;

            if (state.responseStarted)
                newState.content += action.data;
            else newState.buffer += action.data;

            return newState;
        } 
    }
}