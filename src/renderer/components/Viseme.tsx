import { Viseme } from "@common/types";
import { useEffect, useReducer } from "react";

const Viseme: React.FC = () => {
    const [visemes, dispatchVisemes] = useReducer(visemeReducer, []);

    useEffect(() => {
        window.azure.onSynthesisViseme((viseme) => {
            dispatchVisemes({ type: 'add', viseme });
        })

        window.azure.onSynthesisEnd(() => {
            console.log(visemes)
        })

        return () => {
            window.azure.removeSynthesisVisemeListeners();
            window.azure.removeSynthesisEndListeners();
        }
    }, [])

    return ''
};

export default Viseme;

function visemeReducer(
    state: Viseme[],
    action: { type: 'add', viseme: Viseme },
) {
    switch (action.type) {
        case 'add':
            return state.concat(action.viseme);
    }
}