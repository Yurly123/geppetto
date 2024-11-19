import { Setting, settingValue } from "@common/types";
import React, { createContext, Dispatch, ReactNode, useReducer } from "react";

export const SettingContext = createContext<Setting>(null);
export const DispatchSettingContext = createContext<Dispatch<action>>(null);

type action = Parameters<typeof settingReducer>[1]
function settingReducer(
    state: Setting, 
    action: { 
        type: 'change' | 'reset',
        name?: string,
        value?: settingValue,
    },
): Setting {
    switch (action.type) {
        case 'change': if (!action.name) return state; {
            const element = state[action.name]
            if (!element || typeof element.value !== typeof action.value)
                return state;
            element.value = action.value
        } break;
        case 'reset': if (!action.name) return state; {
            const element = state[action.name]
            if (!element) return state;
            element.value = element.default
        } break;
    }
    return state
}

type Props = { children: ReactNode; }
export const SettingProvider: React.FC<Props> = ({
    children
}) => {
    const initialSetting: Setting = {
        'TTS음량': { type: 'number', value: 100, default: 100 },
    }
    const [setting, dispatchSetting] = useReducer(settingReducer, initialSetting);

    return (
        <SettingContext.Provider value={setting}>
            <DispatchSettingContext.Provider value={dispatchSetting}>
                {children}
            </DispatchSettingContext.Provider>
        </SettingContext.Provider>
    )
};