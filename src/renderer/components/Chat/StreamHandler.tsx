import { DispatchChatContext } from "@components/contexts";
import { useContext, useEffect, useReducer } from "react";

const StreamHandler: React.FC = () => {
    const dispatchChat = useContext(DispatchChatContext)
    const [response, dispatchResponse] = useReducer(reponseReducer, '');

    useEffect(() => {
        const formattedResponse = response + `\"}]}`;
        try {
            const json = JSON.parse(formattedResponse);
            dispatchChat({ type: 'changePartial', partial: { response: json } })
        } catch {}
    }, [response]);

    useEffect(() => {
        window.openai.onCompletionChunk((chunk) => {
            dispatchResponse({ type: 'data', data: chunk })
        });
        return () => {
            window.openai.removeCompletionChunkListeners();
        }
    }, []);

    return null
}

export default StreamHandler;

function reponseReducer(
    state: string,
    action: { type: 'data', data: string }
): string {
    switch (action.type) {
        case 'data':
            return state + action.data;
        default:
            return state;
    }
}