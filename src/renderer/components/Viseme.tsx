import { getVisemeSymbol } from "@common/azure";
import { Viseme } from "@common/types";
import { useEffect, useReducer, useState } from "react";

const Viseme: React.FC = () => {
    const [visemes, dispatchVisemes] = useReducer(visemeReducer, []);
    const [viseme, setViseme] = useState<Viseme | null>(null);

    useEffect(() => {
        window.azure.onSynthesisViseme((viseme) => {
            dispatchVisemes({ type: 'add', viseme });
        })

        window.azure.onSynthesisEnd(() => {
            setViseme({
                visemeId: 0,
                offset: -1,
            })
        })

        return () => {
            window.azure.removeSynthesisVisemeListeners();
            window.azure.removeSynthesisEndListeners();
        }
    }, [])

    useEffect(() => {
        if (!viseme) return;
        if (viseme.offset === -1) {
            visemes.forEach((v) => 
                setTimeout(() => {
                    setViseme(v)
                }, v.offset)
            )
            dispatchVisemes({ type: 'clear' });
        }
    }, [viseme])

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