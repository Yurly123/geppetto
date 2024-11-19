export interface SettingElement<T> {
    value: T;
    default: T;
}

// When you add a new setting type,
// you should update both 'settingValue' and 'Setting'

export type settingValue = number | boolean;

export interface BooleanSettingElement
    extends SettingElement<boolean> { };

export interface NumberSettingElement
    extends SettingElement<number> {
    min?: number;
    max?: number;
};

export interface Setting {
    [name: string]:
    NumberSettingElement |
    BooleanSettingElement;
}

const _initialSetting = {
    'TTS음량': { value: 100, default: 100, min: 0, max: 100 }, 
    'TTS토글asdfasdf': { value: true, default: true },
}

export const initialSetting = _initialSetting as Setting
export type ReadableSetting = typeof _initialSetting