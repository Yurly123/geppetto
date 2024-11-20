import { initialSetting, NumberSettingElement, Setting, SettingElement, settingValue } from "@common/setting";
import React, { createContext, Dispatch, ReactNode, useReducer } from "react";

export const SettingContext = createContext<Setting>(null);
export const DispatchSettingContext = createContext<Dispatch<action>>(null);

type action = Parameters<typeof settingReducer>[1]

function settingReducer(
    state: Setting, 
    action: { 
        type: 'change' | 'reset' | 'changeAll',
        name?: keyof Setting,
        value?: settingValue,
        setting?: Setting,
    },
): Setting {
    switch (action.type) {
        case 'change': return change(action.name, action.value)
        case 'reset': return reset(action.name)
        case 'changeAll': return action.setting || state
        default: return state
    }
    function change(name: keyof Setting, value: settingValue): Setting {
        if (!name) return state;
        const element = state[name]
        if (!element || typeof element.default !== typeof value)
            return state;
        return {
            ...state,
            [name]: { ...element, value } as SettingElement
        }
    }
    function reset(name: keyof Setting): Setting {
        if (!name) return state;
        const element = state[name]
        if (!element) return state;
        return {
            ...state,
            [name]: { ...element, value: element.default } as SettingElement
        }
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