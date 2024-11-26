export type settingValue = number | boolean;

export interface ISettingElement<T extends settingValue> {
    value: T;
    readonly default: T;
}

export interface BooleanSettingElement
    extends ISettingElement<boolean> { };

export interface NumberSettingElement
    extends ISettingElement<number> {
    min?: number;
    max?: number;
};

export type SettingElement = BooleanSettingElement | NumberSettingElement;

export interface ISetting {
    [name: string]: SettingElement
}

export interface Setting extends ISetting {
    'TTS음량': NumberSettingElement;
    'TTS토글': BooleanSettingElement;
}

export const initialSetting: Setting = {
    'TTS음량': { value: 100, default: 100, min: 0, max: 100 }, 
    'TTS토글': { value: true, default: true },
}
