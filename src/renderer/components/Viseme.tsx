import { Viseme } from "@common/types";
import { useEffect, useReducer } from "react";

const Viseme: React.FC = () => {
    const [viesmes, dispatchVisemes] = useReducer(visemeReducer, []);

    useEffect(() => {
        window.azure.onSynthesisViseme((viseme) => {
            dispatchVisemes({ type: 'add', viseme });
        })
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