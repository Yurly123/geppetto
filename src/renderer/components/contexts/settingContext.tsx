import { initialSetting, NumberSettingElement, Setting, SettingElement, settingValue } from "@common/setting";
import React, { createContext, Dispatch, ReactNode, useReducer } from "react";

export const SettingContext = createContext<Setting>(null);
export const DispatchSettingContext = createContext<Dispatch<action>>(null);

type action = Parameters<typeof settingReducer>[1]

function settingReducer(
    state: Setting, 
    action: { 
        type: 'change' | 'reset',
        name?: keyof Setting,
        value?: settingValue,
    },
): Setting {
    switch (action.type) {
        case 'change': if (!action.name) return state; {
            const element = state[action.name]
            if (!element || typeof element.default !== typeof action.value)
                return state;
            action = preprocessAction(state, action);
            return {
                ...state,
                [action.name]: {
                    ...element,
                    value: action.value
                } as SettingElement
            }
        }

        case 'reset': if (!action.name) return state; {
            const element = state[action.name]
            if (!element) return state;
            return {
                ...state,
                [action.name]: {
                    ...element,
                    value: element.default
                } as SettingElement
            }
        } 

        default: return state
    }
}

type Props = { children: ReactNode; }
export const SettingProvider: React.FC<Props> = ({
    children
}) => {
    const [setting, dispatchSetting] = useReducer(settingReducer, initialSetting);

    return (
        <SettingContext.Provider value={setting}>
            <DispatchSettingContext.Provider value={dispatchSetting}>
                {children}
            </DispatchSettingContext.Provider>
        </SettingContext.Provider>
    )
};

function preprocessAction(state: Setting, action: action): action {
    if (typeof action.value === 'number') {
        const element = state[action.name] as NumberSettingElement
        if (element.min && action.value < element.min) 
            action.value = element.min;
        if (element.max && action.value > element.max) 
            action.value = element.max;
    }
    return action;
}