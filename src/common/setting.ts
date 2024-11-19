export type settingValue = number | boolean;
export type settingType = 'number' | 'boolean';
export interface SettingElement {
    type: settingType;
    value: settingValue;
    default: settingValue;
}

export interface Setting {
    [name: string]: SettingElement;
}

const _initialSetting = {
    'TTS음량': { type: 'number', value: 100, default: 100 },
}

export const initialSetting = _initialSetting as Setting
export type ReadableSetting = typeof _initialSetting
