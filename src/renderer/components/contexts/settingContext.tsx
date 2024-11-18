import { Setting } from "@common/class";
import { SettingElement } from "@common/types";
import React, { createContext, Dispatch, ReactNode, useReducer } from "react";

export const SettingContext = createContext<Setting>(null);
export const DispatchSettingContext = createContext<Dispatch<action>>(null);

type action = Parameters<typeof settingReducer>[1]
function settingReducer(
    state: Setting, 
    action: { 
        type: 'change' | 'reset',
        name?: string,
        value?: SettingElement['value'],
    },
): Setting {
    if (action.type === 'change' && action.name) {
        const setting = state.get(action.name);
        if (typeof setting.value !== typeof action.value) return state;
        setting.value = action.value;
    }
    if (action.type === 'reset') {
        if (action.name) {
            const setting = state.get(action.name);
            setting.value = setting.default;
        }
        else {
            state.settings.forEach(setting => setting.value = setting.default);
        }
    }
    return state
}

type Props = { children: ReactNode; }
export const SettingProvider: React.FC<Props> = ({
    children
}) => {
    const settings: SettingElement[] = [
        { name: 'TTS음량', type: 'number', default: 50, value: 50 },
    ]
    const [setting, dispatchSetting] = useReducer(settingReducer, new Setting(settings));

    return (
        <SettingContext.Provider value={setting}>
            <DispatchSettingContext.Provider value={dispatchSetting}>
                {children}
            </DispatchSettingContext.Provider>
        </SettingContext.Provider>
    )
};