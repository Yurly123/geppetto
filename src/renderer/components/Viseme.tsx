import { getVisemeSymbol, Viseme } from "@common/azure";
import { useContext, useEffect, useReducer, useState } from "react";
import { DispatchVoicePlayingContext, VoicePlayingContext } from "@components/contexts";

const Viseme: React.FC = () => {
    const [visemes, dispatchVisemes] = useReducer(visemeReducer, []);
    const [viseme, setViseme] = useState<Viseme | null>(null);
    const voicePlaying = useContext(VoicePlayingContext);
    const dispatchVoicePlaying = useContext(DispatchVoicePlayingContext);

    useEffect(() => {
        window.azure.onSynthesisViseme((viseme) => {
            dispatchVisemes({ type: 'add', viseme });
        })

        return () => window.azure.removeSynthesisVisemeListeners();
    }, [])

    useEffect(() => {
        if (!voicePlaying) return;
        visemes.forEach((v) => 
            setTimeout(() => {
                setViseme(v)
            }, v.offset + 300)
        )
        dispatchVisemes({ type: 'clear' });
        dispatchVoicePlaying(false);
    }, [voicePlaying])

    return viseme ? 
        getVisemeSymbol(viseme.visemeId) 
        : null;
};

export default Viseme;

function visemeReducer(
    state: Viseme[],
    action: { type: 'add' | 'clear', viseme?: Viseme },
) {
    switch (action.type) {
        case 'add':
            return state.concat(action.viseme);
        case 'clear':
            return [];
    }
}